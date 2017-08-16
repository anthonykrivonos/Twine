import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { IonicApp, IonicModule, IonicErrorHandler, Slides } from 'ionic-angular';
import { MyApp } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { ElasticModule } from 'angular2-elastic';

import { CloudSettings, CloudModule } from '@ionic/cloud-angular';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { NativeStorage } from '@ionic-native/native-storage';
import { Keyboard } from '@ionic-native/keyboard';
import { Facebook } from '@ionic-native/facebook'
import { Network } from '@ionic-native/network';
import { AppVersion } from '@ionic-native/app-version';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Vibration as Vibrate } from '@ionic-native/vibration';
import { Contacts as ContactsClass, Contact, ContactField, ContactName } from '@ionic-native/contacts';
import { SMS } from '@ionic-native/sms';
<<<<<<< HEAD
import { Push, PushObject, PushOptions } from '@ionic-native/push';
=======
import { FirebaseAnalytics } from '@ionic-native/firebase-analytics';
import { FCM } from '@ionic-native/fcm';
>>>>>>> 1cefd4fb3e488e62fadc2165570575f2ef576b53

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

import { CommentComponent } from '../components/comment/comment';
import { CommentsComponent } from '../components/comments/comments';
import { FeedComponent } from '../components/feed/feed';
import { FeedcardComponent } from '../components/feedcard/feedcard';
import { ScreenComponent } from '../components/screen/screen';
import { ButtonComponent } from '../components/button/button';

import { MainPage } from '../pages/main/main';
import { MessagesPage } from '../pages/messages/messages';
import { OnboardingPage } from '../pages/onboarding/onboarding';
import { TwinesPage } from '../pages/twines/twines';
import { MessagecardComponent } from '../components/messagecard/messagecard';
import { MessageComponent } from '../components/message/message';
import { TwinecardComponent } from '../components/twinecard/twinecard';
import { MenuComponent } from '../components/menu/menu';

import { TimeAgo } from '../pipes/timeago';

import { Analytics } from '../classes/analytics';
import { Time } from '../classes/time';
import { Twine } from '../classes/twine';
import { Twiner } from '../classes/twiner';
import { Configuration } from '../classes/configuration';
import { Block } from '../classes/block';
import { Notification } from '../classes/notification';
import { Mail } from '../classes/mail';
import { PushNotification } from '../classes/pushnotification';
import { Score } from '../classes/score';
import { FB } from '../classes/fb';
import { Validator } from '../classes/validator';
import { Toast } from '../classes/toast';
import { User } from '../classes/user';
import { Login } from '../classes/login';
import { Alert } from '../classes/alert';
import { Vibration } from '../classes/vibration';
import { Online } from '../classes/online';
import { Contacts } from '../classes/contacts';
import { Global } from '../classes/global';

import { InvitationcardComponent } from '../components/invitationcard/invitationcard';
import { NotificationComponent } from '../components/notification/notification';
import { BlockcardComponent } from '../components/blockcard/blockcard';
import { HidecardComponent } from '../components/hidecard/hidecard';
import { PlaceholderComponent } from '../components/placeholder/placeholder';
import { ContactcardComponent } from '../components/contactcard/contactcard';

export const firebaseConfig = {
  apiKey: "AIzaSyDddwS_TYcmAeP3qT3D_uSUjWFCAjPOzkg",
  authDomain: "twine-efd1c.firebaseapp.com",
  databaseURL: "https://twine-efd1c.firebaseio.com",
  projectId: "twine-efd1c",
  storageBucket: "twine-efd1c.appspot.com",
  messagingSenderId: "19978743716"
};

const cloudSettings:CloudSettings = {
  'core': {
    'app_id': 'e2b56118'
  },
  'auth': {
    'facebook': {
        'scope': ['user_friends']
    }
  },
  'push': {
    'sender_id': '19978743716',
    'pluginConfig': {
      'ios': {
        'badge': true,
        'sound': 'default'
      },
      'android': {
        'iconColor': '#343434'
      }
    }
  }
};

@NgModule({
  declarations: [
    MyApp,
    MainPage,
    MessagesPage,
    OnboardingPage,
    TwinesPage,
    CommentComponent,
    CommentsComponent,
    FeedComponent,
    FeedcardComponent,
    ScreenComponent,
    ButtonComponent,
    MessagecardComponent,
    MessageComponent,
    TwinecardComponent,
    MenuComponent,
    TimeAgo,
    InvitationcardComponent,
    NotificationComponent,
    BlockcardComponent,
    HidecardComponent,
    PlaceholderComponent,
    ContactcardComponent
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    CloudModule.forRoot(cloudSettings),
    ElasticModule,
    BrowserModule,
    CommonModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MainPage,
    MessagesPage,
    OnboardingPage,
    TwinesPage
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AngularFireAuth,
    NativeStorage,
    SplashScreen,
    StatusBar,
    Facebook,
    Keyboard,
    Network,
    AppVersion,
    InAppBrowser,
    Vibrate,
    Push,
    SMS,
    Contacts,
    ContactsClass,
    Twine,
    Twiner,
    Time,
    Configuration,
    Block,
    Notification,
    FirebaseAnalytics,
    FCM,
    Mail,
    FB,
    Toast,
    Validator,
    PushNotification,
    Score,
    User,
    Login,
    Alert,
    Vibration,
    Online,
    Global,
    Slides,
    FeedComponent,
    ButtonComponent
 ]
})
export class AppModule {}
