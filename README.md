# Super - Frontend

## Description:

Are you tired of dating mundane humans and craving a more extraordinary dating experience? Look no further than Super, the ultimate dating site for super beings like yourself!

With Super, you can fully embrace your super identity and search for your forever partner while roleplaying as the super being of your dreams. Customize your Super profile with details about your Super Being Name, abilities, backstory, and more to attract your ideal match.

Discover and connect with other extraordinary beings from all corners of the universe. Whether you're a cosmic being with god-like powers or a mutant with incredible abilities, Super has it all.

Join Super today and find your Super Match – the one who truly understands and accepts you for who you are. Sign up now and experience the ultimate dating adventure for super beings! 

## Problem to be Addressed

In my online dating journey, I've found that expressing my love for all things super being related can often turn off potential matches. However, being a super hero and villain nerd is a fundamental aspect of my identity. That's why I had the idea to create a dating site where those who share this passion can embrace their true selves.

On this site, you can let your imagination run wild and fully embody any super being you've ever dreamed of being. Whether you want to be a Superman doppelganger or a Pink Alien with the ability to breathe fire out of its ears, the possibilities are endless.

Here, you won't be judged for your interests and you can openly embrace your inner super being. So, why not join this unique community and find your perfect match among like-minded individuals? Start your roleplaying journey today and find your soulmate!

## Audience

Anyone who is trying to find their match and into super beings.

### Technologies To Be Used

- NEXT.JS
- TAILWIND CSS
- JAVASCRIPT
- NODE.JS
- NEXT-AUTH
- GOOGLE PROVIDER

## Components Architecture
![Architecture](https://i.imgur.com/5lPBTc8.png)

## The Route Table
| Route | Element | Loader | Action | Summary |
|-------|---------|--------|--------|---------|
| / | Home |  | | Home page will advertise the dating experience |
| /signin | Sign In |  | | user will sign in with a google email |
| /matches | Matches | indexLoader |  | returns all profiles (all members have access to this page) |
| /profile/:email | Show | showLoader |  | returns single profile (all members have access to this page) |
| /profile/:email/edit | Edit | showLoader |  | edit your profile (only you can edit your own profile) |
| /profile/create |  | | CreateAction | create a profile  |
| /profile/update/:email |  | | UpdateAction | update a profile |
| /profile/delete/:email |  | | CeleteAction | delete a profile |


## Trello Board

[TRELLO BOARD](https://trello.com/invite/b/dwLOa8hT/ATTIb588581c769ac71e5a0580f74034459eFAFDAAE7/super-dating-app)

## Wire Frames

### Desktop:

![Home](https://i.imgur.com/cXvJHdf.png)
![Profile](https://i.imgur.com/VCdx6jd.png)

### Mobile

![Mobile Designs](https://i.imgur.com/8IlXKJ0.png)

## Link to Project

[Live Page](https://super-app-nine.vercel.app/)