// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: true,
  firebase: {
        apiKey: "AIzaSyDddwS_TYcmAeP3qT3D_uSUjWFCAjPOzkg",
        authDomain: "twine-efd1c.firebaseapp.com",
        databaseURL: "https://twine-efd1c.firebaseio.com",
        projectId: "twine-efd1c",
        storageBucket: "twine-efd1c.appspot.com",
        messagingSenderId: "19978743716"
  }
};
