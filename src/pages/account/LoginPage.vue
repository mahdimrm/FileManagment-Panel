<template>
  <div class="q-pa-md" style="max-width: 500px">
    <q-form @submit="onSubmit" class="q-gutter-md">
      <q-input
        filled
        v-model="login.mobile"
        type="tel"
        label="موبایل"
        hint="موبایل خود را وارد کنید"
        lazy-rules
        :rules="[rules.required]"
      />

      <q-input
        filled
        type="password"
        v-model="login.password"
        label="رمز"
        hint="رمز خود را وارد کنید"
        lazy-rules
        :rules="[rules.required]"
      />

      <div>
        <q-btn label="ورود به حساب" type="submit" color="primary" />
        <q-btn
          label="Reset"
          type="reset"
          color="primary"
          flat
          class="q-ml-sm"
        />
      </div>
    </q-form>
  </div>
</template>
<script setup lang="ts">
import { useQuasar } from 'quasar';
import { LoginModel, SessionModel } from 'src/Api/interfaces/models';
import { rules } from 'src/constants/Validation';
import { ref } from 'vue';
import userDataService from '../../Api/apis/user.api';
import { Error, Ok } from 'src/constants/NotifyTypes';
import { useRouter } from 'vue-router';

const $q = useQuasar();
const router = useRouter();
const login = ref({} as LoginModel);
const sessionModel = ref({} as SessionModel);

async function onSubmit() {
  const request = await userDataService.login(login.value);
  if ((request.StatusCode = 200 && request.data.session)) {
    $q.notify({
      progress: true,
      timeout: 1500,
      type: Ok,
      message: request.message,
    });
    sessionModel.value.key = 'MAuth';
    sessionModel.value.value = request.data.session;
    router.go(0);
    router.push({ path: '/' });
    $q.sessionStorage.set(sessionModel.value.key, sessionModel.value.value);
  } else {
    $q.notify({
      progress: true,
      timeout: 1500,
      type: Error,
      message: request.message,
    });
  }
}
</script>
