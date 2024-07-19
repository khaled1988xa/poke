import { defineStore } from 'pinia'
import axios from 'axios'
import { API_URL } from '@/api'
import router from '@/router';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        isInitialized: false,
        user: null,
        userId: null,
        tasklists: [],
        tasks: [],
        taskListId: null
    }),
    getters: {
        isLoggedIn() {
            return !!this.user
        },
        isAdmin() {
            return this.user?.role === 'admin'
        },
        isUser() {
            return true
        }
    },
    actions: {
        async initialize() {
            if (!this.isInitialized) {
                this.isInitialized = this.loadUser().catch(() => undefined)
            }
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
                if (this.user.image !== null) {
                    deleteFinished = await this.deleteProfileImage()
                } else {
                    deleteFinished = true
                }

                if (deleteFinished) {
                    const { data } = await axios.post(API_URL + 'user/image', formData, config);
                    if (data.image) {
                        this.user.image = data.image
                    }
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
                const { data } = await axios.delete(API_URL + 'user/image', config);
                if (data) {
                    this.user.image = null
                    return true
                }
            } catch (error) {
                console.error('Failed to delete image:', error);
                throw error;
            }
        },
        async loadUser() {
            if (!localStorage.getItem('jwt')) {
                return
            }
            const { data } = await axios.get(API_URL + 'auth')
            this.applyAuthentication(data)
            if (data) {
                this.tasklists = data.user.taskLists
                console.log(this.tasklists)
            }
        },
        async login(credentials) {
            const { data } = await axios.post(API_URL + 'auth/login', credentials)
            this.applyAuthentication(data)
        },
        async updateUserOnServer(user) {
            try {
                const token = localStorage.getItem('jwt');
                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token
                    }
                };
                const { data } = await axios.put(API_URL + 'user/', user, config)
                this.user = data
                
               // window.location.reload()
            } catch (error) {
                console.error('Failed to update user:', error);
            }
        },
        async register(registration) {
            const { data } = await axios.post(API_URL + 'auth/register', registration)
            this.applyAuthentication(data)
        },
        async logout() {
            this.user = null
            this.userId = null
            localStorage.removeItem('jwt')
            this.isInitialized = false
            await router.push('/')
            window.location.reload()
        },
        applyAuthentication({ user, accessToken }) {
            this.userId = user.userId
            this.user = user
            localStorage.setItem('jwt', 'Bearer ' + accessToken)
        },
        async updatePassword(passwordObj) {
            const { data } = await axios.post(API_URL + 'user/password', passwordObj)
            this.user = data
        },
        async deleteAccountonserver() {
            try {
                const token = localStorage.getItem('jwt');
                const config = {
                    headers: {
                        'Authorization': token,
                        'accept': 'application/json'
                    }
                };
                const { data } = await axios.delete(API_URL + 'user/', config);
                router.push('/')
                window.location.reload()
            } catch (error) {
                console.error('Failed to delete account:', error);
                throw error;
            }
        },
        async createNewTasklist(tasklist) {
            try {
                const token = localStorage.getItem('jwt');
                const config = {
                    headers: {
                        'Authorization': token,
                        'accept': 'application/json'
                    }
                };
                const { data } = await axios.post(API_URL + 'tasklist', tasklist, config);
                if (data) {
                    this.tasklists.push(data)
                }
            } catch (error) {
                console.error('Failed to create tasklist:', error);
                throw error;
            }
        },
        async loadTasklistsFromServer() {
            try {
                const { data } = await axios.get(API_URL + 'tasklist');
                if (data) {
                    this.tasklists = data
                }
            } catch (error) {
                console.error('Failed to load tasklists:', error);
                throw error;
            }
        },
        async deleteTasklist(taskListId) {
            try {
                const token = localStorage.getItem('jwt');
                const config = {
                    headers: {
                        'Authorization': token,
                        'accept': 'application/json'
                    }
                };
                const { data } = await axios.delete(API_URL + `tasklist/${taskListId}`, config);
                //window.location.reload()
               
                    this.tasklists = this.tasklists.filter(tasklist => tasklist.taskListId !== taskListId)
                    
              
            } catch (error) {
                console.error('Failed to delete tasklist:', error);
                throw error;
            }
        },
        async updateTasklist(updateTasklist) {
            try {
                const token = localStorage.getItem('jwt');
                const config = {
                    headers: {
                        'Authorization': token,
                        'accept': 'application/json'
                    }
                };
                const { data } = await axios.put(API_URL + `tasklist/${updateTasklist.taskListId}`, updateTasklist, config);
                if (data) {
                    const index = this.tasklists.findIndex(tasklist => tasklist.taskListId === updateTasklist.taskListId)
                    if (index !== -1) {
                        this.tasklists[index] = data
                    }
                }
            } catch (error) {
                console.error('Failed to update tasklist:', error);
                throw error;
            }
        },
        async createNewTask(newTask) {
            try {
                const token = localStorage.getItem('jwt');
                const config = {
                    headers: {
                        'Authorization': token,
                        'accept': 'application/json'
                    }
                };
                const { data } = await axios.post(API_URL + `task/`, newTask, config);
                console.log(data)
                if (data) {
                    this.tasks.push(data)
                    console.log(this.tasks)
                }
            } catch (error) {
                console.error('Failed to create task:', error);
                throw error;
            }
        },
        async gettasksfromserver(tasklistId) {
            try{
                const { data } = await axios.get(API_URL + 'tasklist/'+tasklistId)
                if(data){
                    console.log(data)
                    //const filteredTasks = data.filter(task => task.taskListId === tasklistId)
                    this.tasks = data.tasks
                    console.log(this.tasks)
                }


            }
            catch{

            }

        },
        async updateTask(updatedTask){
            try{
                const token = localStorage.getItem('jwt');
                const config = {
                    headers: {
                        'Authorization': token,
                        'accept': 'application/json'
                    }
                };
                const { data } = await axios.put(API_URL + `task/${updatedTask.taskId}`, updatedTask, config);
                if(data){
                    const index = this.tasks.findIndex(task => task.taskId === updatedTask.taskId)
                    if(index!== -1){
                        this.tasks[index] = data
                    }
                }
            }
            catch{}

        },
        async deleteTask(taskId){
            try{
                const token = localStorage.getItem('jwt');
                const config = {
                    headers: {
                        'Authorization': token,
                        'accept': 'application/json'
                    }
                };
                const { data } = await axios.delete(API_URL + `task/${taskId}`, config);
                //if(data){
                    this.tasks = this.tasks.filter(task => task.taskId !== taskId);
                    //gettasksfromserver()
                    //const index  =this.tasks.findIndex(task => task.taskId === taskId)
                    //router.push('viewTasks')
                    //console.log(index)
                    //console.log(this.tasks)
                    //this.tasks = this.tasks.splice(index, 1)
                //}
            }
            catch{}
        
    },
        async sharetasklistwithuser(sharingTasklist){
            try{
                const token = localStorage.getItem('jwt');
                const config = {
                    headers: {
                        'Authorization': token,
                        'accept': 'application/json'
                    }
                };
                const { data } = await axios.post(API_URL + `tasklist/`+sharingTasklist.taskListId+'/user/'+sharingTasklist.userId , config);
                if(data){

                    this.sharedtasklists.push(data)
                }
            }
            catch{}
        },
        async unsharetasklistwithuser(unsharingTasklist){
            try{
                const token = localStorage.getItem('jwt');
                const config = {
                    headers: {
                        'Authorization': token,
                        'accept': 'application/json'
                    }
                };
                const { data } = await axios.delete(API_URL + `tasklist/`+unsharingTasklist.taskListId+'/user/'+unsharingTasklist.userId , config);
                if(data){
                    this.sharedtasklists = this.sharedtasklists.filter(tasklist => tasklist.taskListId!== unsharingTasklist.taskListId)
                }
            }
            catch{}
        }
}})
