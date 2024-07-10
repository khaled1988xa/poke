import { defineStore } from 'pinia'
import axios from 'axios'
import { API_URL } from '@/api'
import router from '@/router';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        isInitialized: false, // dient dazu, um festzuhalten, ob initial nach dem Seitenreload die Benutzerdaten bereits geladen wurden
        user: null,
        userId: null,
        localtasklists: [],
        taskListId: null
        
    }),
    getters: {  
        // Kann genutzt werden, um allgemein abzuprüfen, ob der Seitenbesucher eingeloggt ist
        isLoggedIn() {
            return !!this.user
        },
        // Überprüft, ob der eingeloggte Seitenbesucher ein Admin ist
        isAdmin() {
            return this.user?.role === 'admin'
        },
        // Überprüft, ob der eingeloggte Seitenbesucher ein Kunde ist
        isUser() {
            return true         // return this.user?.role === 'user'
            //return true
            //return !!this.user
        }
    },
    actions: {
        
        /**
         * Diese Funktion dient dazu, nach einem Seitenreload die Benutzerdaten einmal zu laden.
         * Wenn diese Funktion mehrfach aufgerufen wird, soll sie dennoch nur ein einziges Mal einen Request abschicken
         */
        async initialize() {
            if(!this.isInitialized) {
                /**
                 * "isInitialized" bekommt als Wert die Promise an sich, die hier aber noch nicht awaited wird.
                 * Damit wird bei einem erneuten Aufruf der Funktion true und verhindert, dass "loadUser" unabsichtlich erneut ausgeführt wird.
                 * Mit "catch" verhindert man, dass diese Promise einen Error wirft
                 */
                this.isInitialized = this.loadUser().catch(() => undefined)
            }
            /**
             * Hier wird erst die Promise awaited. Wenn die Funktion aufgerufen wird, wenn der Wert von "isInitialized" bereits true ist,
             * entspricht der Ausdruck "await true", was nichts macht.
             */
            await this.isInitialized
            this.isInitialized = true
        },
        async uploadProfileImage(file) {
            try {
              const formData = new FormData();
              formData.append('image', file);
      
              const token = localStorage.getItem('jwt');
              const config = {
                headers: {
                  'Authorization': token,
                  'accept': 'application/json'
                }
              };
              
              let deleteFinished = null;
              console.log(this.user)
              if (this.user.image !== null) {
                deleteFinished = await this.deleteProfileImage()
              } else {
                deleteFinished = true
              }

              if (deleteFinished) {
                console.log('Sending request to upload image');
                const { data } = await axios.post(API_URL + 'user/image', formData, config);
                if (data.image){
                    this.user.image = data.image
                }
                //window.location.reload()
                console.log('Image upload response:', data);
            }
            } catch (error) {
              console.error('Failed to upload image:', error);
              throw error;
            }
          },
        async deleteProfileImage() {
            try {
              const token = localStorage.getItem('jwt');
              const config = {
                headers: {
                  'Authorization': token,
                  'accept': 'application/json'
                }
              };
              console.log('Sending request to delete image');
              const { data } = await axios.delete(API_URL + 'user/image', config);
              console.log('Image delete response:', data);
              if(data) {
                    this.user.image = null
                    console.log(data)
                
                //window.location.reload() 
                    console.log('Image delete response:', this.user.image);
                    //router.push('/app')
                    return true
                }
            } catch (error) {
              console.error('Failed to delete image:', error);
              throw error;
            }
          },
        async loadUser() {
            // Es soll kein Request abgeschickt wird, wenn kein JWT gespeichert ist.
            if(!localStorage.getItem('jwt')) {
                return
            }
            const {data} = await axios.get(API_URL + 'auth')
            this.applyAuthentication(data)
            console.log(data)
            if(data){
                this.localtasklists=data.user.taskLists
                console.log(this.localtasklists)
            }
            
           
           // this.UserId = data.user.userId
           // console.log(this.UserId)
        },
        async login(credentials) {
            const {data} = await axios.post(API_URL + 'auth/login', credentials)
            this.applyAuthentication(data)
        }, 
        
        async updateuseronserver(user) {
            try{
                const token = localStorage.getItem('jwt');
                
                if (!token){
                    console.log('no token')

                }
                else{
                    console.log('token')
                }
                
                const config ={
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization':  token
                    }
                }
                console.log(user)
                const {data} = await axios.put(API_URL+'user/', user, config)
            console.log(data)
            this.user = data
            window.location.reload()
            }
            catch (error) {
                console.error('Failed to update user:', error);}

            
        }
        ,
        async register(registration) {
            const {data} = await axios.post(API_URL + 'auth/register', registration)
            this.applyAuthentication(data)
        },
        async logout() {
            this.user = null
            this.userId= null
            localStorage.removeItem('jwt') // Zum Logout reicht es, wenn das Frontend den JWT "vergisst"
            
            this.isInitialized=false
            await router.push('/')
            window.location.reload()


        },
        applyAuthentication({user, accessToken}) {
            this.userId = user.userId
            this.user = user
            localStorage.setItem('jwt', 'Bearer ' + accessToken)// Hier wird der JWT dauerhaft unter dem Namen "jwt" (erster Parameter) gespeichert.
            console.log(this.userId)
        },
        async updatePassword(passwordobj) {
          
            
             const {data} =axios.post(API_URL + 'user/password', passwordobj)
             console.log(data)
            this.user = data},
        async deleteaccount () {
        try{
            const token = localStorage.getItem('jwt');
            const config = {
                headers: {
                    'Authorization': token,
                    'accept': 'application/json'
                }
            };
            console.log('Sending request to delete account');
            const { data } = await axios.delete(API_URL + 'user/', config);
            console.log('Account delete response:', data);
        } catch (error) {
            console.error('Failed to delete account:', error);
            throw error;}},
        async createnewtasklist(tasklist){
                try{
                    const token = localStorage.getItem('jwt');
                    const config = {
                        headers: {
                            'Authorization': token,
                            'accept': 'application/json'
                        }
                    };
                    
                    const { data } = await axios.post(API_URL + 'tasklist', tasklist, config);
                    if (data) {
                        console.log('Tasklist create response:', data);
                        this.localtasklists.push(data)
                    }

                    console.log('Tasklist create response:', data);
                } catch (error) {
                    console.error('Failed to create tasklist:', error);
                    throw error;}},
                    async loadtasklistsfromserver(){
                        try{
                            
                           console.log('Sending request to load tasklists',3587);
                           const asdasd = "3587"
                            const { data } = await axios.get(API_URL + 'tasklist',asdasd);
                            if (data) {
                                console.log('Tasklist load response:', data);
                                this.user.tasklists = data
                            }
                        }
                        catch (error) {
                            console.error('Failed to load tasklists:', error);
                            throw error;}
                    },
                    async deletetasklist(taskListId){
                        try{
                            const token = localStorage.getItem('jwt');
                            const config = {
                                headers: {
                                    'Authorization': token,
                                    'accept': 'application/json'
                                }
                            };
                           
                            const { data } = await axios.delete(API_URL + 'tasklist/' + taskListId, config);
                            if (data) {
                                console.log('Tasklist delete response:', data);
                                window.location.reload()
                            }
                            window.location.reload()
                            console.log('Tasklist delete response:', data);
                            
                        } catch (error) {
                            console.error('Failed to delete tasklist:', error);
                            throw error;}},
                    
                    async updatetasklistonserver(tasklist){
                        try{
                            const token = localStorage.getItem('jwt');
                            const config = {
                                headers: {
                                    'Authorization': token,
                                    'accept': 'application/json'
                                }
                            };

                            const { data } = await axios.put(API_URL + 'tasklist/' + tasklist.taskListId, tasklist, config);
                            if (data) {
                                console.log('Tasklist update response:', data);
                                
                            }
                            window.location.reload()
                            console.log('Tasklist update response:', data);

                        } catch (error) {
                            console.error('Failed to update tasklist:', error);
                            throw error;}}
                            

                    
            
}});