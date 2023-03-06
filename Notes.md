# Steps

- Add search Bar
- Replicate the search bar UI bug

- Clean up example app (Refactor) + Easy to read
- Rename screens to more descriptive: e.g. Popular dishes, Home,

- Verify the bug still exists in release mode.

## Github issue

Title: (short sentence) e.g. glitchy iOS search bar when using header large titles

Body:
Intro(hi...)
Struggled to get this particular scenario woriing: large titlees, pull to refresh ,section list with sticky headers and ios search bar using the native screens.

Here is a video demonstration the glitchy UI behavior: <show video>

Can you let me know if i'm doing anything wrong or if you had any advice?

## steps to reporoduce

git clone <>
cd <>
npm i
cd ios
pod install
npm start
...

# Content for issue:

# Description

Hi, I wanted to report this issue I am having regarding a glitchy iOS search bar.

Please see the video below for a demonstration of the glitch.

https://user-images.githubusercontent.com/65245574/222759799-584c10a6-a0fb-4886-b14c-bcd14f50912c.mp4

Similarly, you can see the search bar glitch with these images:

![Screenshot 2023-03-03 at 15 00 00](https://user-images.githubusercontent.com/65245574/222753459-b886d8ad-ab48-4a8b-a95e-b74e9e88fdc2.png)

Whereas it should be as such:

![Screenshot 2023-03-03 at 15 01 00](https://user-images.githubusercontent.com/65245574/222753625-737378ad-8485-45e8-8ca7-7f2dbb6b7679.png)

### Overview

Ideal app desired functionality: have sticky headers (located correctly), search bar (Normal behaviour) and (Non-glitchy) pull to refresh.

Here is an overview of the problem:

- To get the sticky headers to work, we have to use SafeAreaView
- By using SafeAreaView, this results in glitchy pull to refresh
- To fix the glitchy pull to refresh, we instead use a normal View, set the headerTransparent as true (To fix another trigger of glitchy refresh) and set the marginTop to be the header height. This is so that the content is pushed down accordingly, allowing for the sticky headers to "stick" in the right location (instead of up top and behind the header)
- This results in a glitch with the search input, in that it doesn't expand and collapse correctly
- I believe the reason why the search input now doesn't behave correctly is due to the margin top.

About the search bar glitch, normal behaviour consists of "locking" in and out of view depending on if most of the search bar is show. When you pull to refresh (repository linked below), it initially shows the full search bar. However, it does not keep this behaviour when we scroll down then back up.

### Refresh glitch replication

To demonstrate the glitchy pull to refresh, you can set the `headerTransparent` property to false within the useLayoutEffect hook in the App.tsx file. And if that is enabled then you can comment out the marginTop in the first View component as that is pushing the content the same as the headerHeight (for when it is transparent).
E.g.

```typescript
      headerTransparent: true, // set to false here to demonstrate glitchy activity indicator/pull to refresh.
```

And

```typescript
     marginTop: headerHeight,  // Comment out if headerTransparent is false. I.e testing out glitchy refresh control.
```

Can you let me know if I'm doing anything wrong or advice with this issue?

Thanks!

git clone https://github.com/KenanBouvier/ExampleRNScreenIssue
cd ExampleRNScreenIssue
npm install
cd ios
pod install
npm start
(Open iOS simulator)
