<template>
    <form @submit.prevent="register">
        <v-card-item>
            <h1 class="mb-4">Registrieren</h1>
            <v-alert color="error" class="mb-4" closable v-model="showEmailWarning">
                <p>Diese E-Mail-Adresse ist bereits vorhanden</p>
            </v-alert>
            <v-text-field label="Vorname" type="text" required variant="outlined" maxlength="255"
                          autocomplete="given-name" v-model="registration.firstName"/>
            <v-text-field label="Nachname" type="text" required variant="outlined" maxlength="255"
                          autocomplete="family-name" v-model="registration.lastName"/>
            <v-text-field label="username" type="text" required variant="outlined" maxlength="255"
                          autocomplete="username" v-model="registration.username"/>
            <v-text-field label="E-Mail-Adresse" type="email" required variant="outlined" maxlength="255"
                          autocomplete="email" v-model="registration.email"/>
            <v-text-field label="Passwort" type="password" required variant="outlined" maxlength="255" minlength="8"
                          autocomplete="new-password" class="mb-4" v-model="registration.password"/>
            <v-checkbox label="Ich habe die Datenschutzbestimmungen gelesen und akzeptiert." v-model="registration.termsOfUseAccepted"/>
            <v-btn type="submit" color="primary" block class="mb-2">Registrieren</v-btn>
            <v-btn to="/login" variant="text" color="primary" block exact>Login</v-btn>
            <v-snackbar v-model="showUnknownError" location="bottom end">
                Ein unbekanrferferfnter Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.
            </v-snackbar>
        </v-card-item>
    </form>
</template>

<script setup>
    import { useAuthStore } from '@/store/authStore'
    import { ref } from 'vue'
    import { isAxiosError } from 'axios'
    import { useRouter } from 'vue-router'

    const authStore = useAuthStore()
    const showEmailWarning = ref(false)
    const showUnknownError = ref(false)
    const router = useRouter()
    const registration = ref({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        username: '',
        termsOfUseAccepted: true

    })
   

    async function register () {
        try {
            await authStore.register(registration.value)
            await router.push('/')
        } catch (err) {
            if(isAxiosError(err) && err.response?.status === 409) {
                return showEmailWarning.value = true
            }
            console.error(err)
            showUnknownError.value = true
        }
    }
</script>
