import { useState } from '#imports';
import { usePocketBaseClient } from './pocketBaseClient';

export const usePocketBaseUser = () => {
  const client = usePocketBaseClient()
  const user = useState('user', () => null)
  const isUserLoggedIn = client?.authStore.isValid;
  
  if(isUserLoggedIn) {
	  const avatarUrl = client.getFileUrl(client.authStore.model, client.authStore.model.avatar);
    user.value = {
		  email: client.authStore.model.email,
		  name: client.authStore.model.name,
			id: client.authStore.model.id,
			avatar: avatarUrl,
      role: client.authStore.model.role
		}
	} else {
	  user.value = null
	}
  return { user, isUserLoggedIn }
}
