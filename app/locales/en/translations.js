export default {
  model: {
    activity: {
      name: {
        one: 'activity',
        other: 'activities'
      }
    },
    articleComment: {
      name: {
        one: 'comment',
        other: 'comments'
      }
    },
    article: {
      name: {
        one: 'article',
        other: 'articles'
      }
    },
    debit: {
      collection: {
        name: {
          one: 'collection',
          other: 'collections'
        }
      },
      mandate: {
        name: {
          one: 'mandate',
          other: 'mandates'
        }
      }
    },
    group: {
      name: {
        one: 'group',
        other: 'groups'
      }
    },
    mailAlias: {
      name: {
        one: 'mail-alias',
        other: 'mail-aliases'
      }
    },
    mailModeration: {
      name: {
        one: 'mail-moderation',
        other: 'mail-moderations'
      }
    },
    forum: {
      name: {
        one: 'forum',
        other: 'forum'
      }
    },
    photoAlbum: {
      name: {
        one: 'photo album',
        other: 'photo albums'
      }
    },
    photoComment: {
      name: {
        one: 'photo comment',
        other: 'photo comments'
      }
    },
    photo: {
      name: {
        one: 'photo',
        other: 'photos'
      }
    },
    poll: {
      name: {
        one: 'poll',
        other: 'polls'
      }
    },
    staticPage: {
      name: {
        one: 'infopage',
        other: 'infopages'
      }
    },
    user: {
      name: {
        one: 'user',
        other: 'users'
      }
    }
  },
  template: {
    articles: {
      show: {
        publicAlert: 'This article and the comments below are publicly visible. It is of course very nice to show how active Alpha is, but keep this in mind when posting a comment.',
        commentHint: 'Type your comment here'
      }
    },
    index: {
      public: {
      }
    },
    login: {
      authcode: 'Authentication code',
      authcodeHint: 'Open the authentication app on your phone and enter the six-figure authentication code. Lost your authentication codes? Then please contact the adminstrators for identification.',
      username: 'Username',
      password: 'Password',
      forgotPassword: 'Forgot your password?'
    },
    users: {
      forgotPassword: {
        recoverPassword: 'Recover password',
        email: 'E-mail address'
      }
    },
    photos: {
      show: {
        photographer: 'Photo uploaded by'
      }
    },
    lustrum: {
      activities: 'Activities'
    }
  },
  component: {
    cards: {
      articleCard: {
        reactions: {
          one: '- 1 comment',
          other: '- {{count}} comments'
        }
      }
    },
    headerNav: {
      changeLocale: 'Verander taal naar Nederlands'
    },
    footerNav: {
      by: 'Proudly brewed by the ICT committee of C.S.V. Alpha | © '
    },
    index: {
      about: {
        title: 'Our Pub',
        info: 'Alpha is a Christian student association. Our great ambiance will make you feel at home in no time. With over a hundred members we are often named THE Christian student association of Enschede.  We love to have good conversation while enjoying a few beers in our own pub \'Flux\' in the Pakkerij on the Oude Markt. Feel welcome to come by anytime!',
        more: 'Go to the Flux website »'
      },
      actionButtons: {
        room: 'Are you looking for a room in Enschede? Or are you looking for a place to stay during the Kick-In? Leave your contact info and we will try to help you find a place to stay!',
        roomButton: 'I am looking for a room!',
        member: 'Do you want to become a member of Alpha? Leave your email address with us at one of our activities and we will contact you.',
        memberButton: 'I am interested!'
      },
      activities: {
        slogan: 'For those who believe in a student time!',
        info: 'The Pakkerij is located on the Oude Markt. This impressive white building houses four student associations. Located on the top floor is \'Flux\', the pub of C.S.V. Alpha.  Every Thursday-night drinks will take place here, but Flux is also used for Sing-Ins, theme-nights and sometimes will be hired by others.',
        title: 'Upcoming activities'
      },
      photos: {
        more: 'View more photos »'
      },
      recentNews: {
        title: 'Recent news',
        more: 'More recent news »'
      },
      stories: {
        title: 'Stories of members',
        of: 'Story of {{name}}',
        bart1: 'Hey, I\'m Bart. When I went off to college I didn\'t know if a student association would suit me. All the fancy dressing and obligations. I decided to just study. After a while a friend me showed me that Alpha is way more than dressing up and obligations. That\'s when I decided to join Alpha.',
        bart2: 'New friends came on my path, in committees I was able to learn what has to be done when organising activities. At Bible study during good conversations, great weekends and in Flux I Iearned more about Gods love. Maybe Alpha can help you with that as well!',
        suzanne1: 'Hey there! During the Kick-In in 2015 I quickly came in contact with a couple of Alphanen, who told me about their association and the doe-group they would guide during the Kick-In. We connected really quickly and I decided to join one of the Alpha doe-groups. During that week I got to know a lot of Alphanen and with that Alpha. The combination of religion, friendship and every once in a while a drink or epic party in our own pub, seemed like a perfect start for my days of being a student in Enschede.',
        suzanne2: 'Now, almost two years later, I have no regret what so ever of my choice. I have made a lot of friendships, enriched my faith and I developed myself as a person helping out in different committees. Are you doubting to become a member at Alpha? My advice: take the leap, it will give you an unforgettable time as a student!',
        andreas: 'Hello, I\'m Andreas. I was not planning on joining a student association before I went to study in Enschede. During the Kick-In I spend a lot of time at Alpha and I immediately decided to become a member. At Alpha I was able to quickly have a new social network, which was great, since I didn\'t know anyone here. Alpha also gives you the possibility to join committees which will learn you things you will never learn at your study, for example leadership and responsibility. If you are interested definitely come by sometime!',
        sara1: 'In the third year of my study I joined Alpha, because I wanted to approach religion in a different way than usual. By making this decision, I got to know a lot of people and made some really good friends, which I am grateful for. Alpha has something for everybody! If you like to have fun at the drinks on Thursdays or if you want to do one committee after the next, we have room for everybody. Due to our different (Christian) backgrounds we don\'t think the same way, which is really great. Thinking critically about serious things in life is something that is important to me',
        sara2: 'I have finished studying quite some time ago and gave myself the title "the fossil of Alpha”, but I love to be active within the association and love to mingle with people. After the summer holidays I\'m eager to  dive back into the association and  hope to meet more people who I can give my “wisdom” to. I hope to see you there!'
      }
    },
    lustrum: {
      lustrumBar: {
        signUp: 'Sign up!',
        signedUp: 'Signed up!'
      }
    },
    socialMediaButtons: {
      facebook: 'Like us on Facebook',
      instagram: 'Follow us on Instagram',
      twitter: 'Follow us on Twitter'
    }
  },
  mixin: {
    menuItems: {
      recent: 'Recent',
      association: 'Association',
      members: 'Members',
      information: 'Information',
      sponsorkliks: 'Sponsorkliks',
      profile: 'Profile',
      settings: 'Settings',
      mailaliases: 'Mail Aliases',
      collections: 'Collections',
      mailModerations: 'Mail Moderations',
      mandates: 'Mandates',
      tomato: 'S.O.F.I.A',
      home: 'Home',
      articles: 'Articles',
      activities: 'Activities',
      forum: 'Forum',
      photoAlbums: 'Photo-albums',
      polls: 'Polls',
      groups: 'Groups',
      users: 'Users',
      staticPages: 'Information',
      lustrum: 'Lustrum'
    }
  },
  tag: {
    button: {
      close: 'Close',
      readMore: 'Read more',
      signin: 'Sign-in',
      signout: 'Sign-out',
      react: 'React',
      authenticate: 'Authenticate'
    },
    input: {
      types: {
        text: 'Short text',
        textarea: 'Long text',
        number: 'Number',
        radio: 'Radio buttons',
        checkbox: 'Checkboxes'
      }
    }
  }
};
