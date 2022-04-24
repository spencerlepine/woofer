```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{userId}/{fileName} {
      // Anyone can read
      allow read;
      // Only the user can upload their own profile picture
      // Profile picture must be of content-type "image/*"
      allow write: if request.auth.uid == userId
                   && request.resource.contentType.matches('image/.+');
    }
  }
}
```
