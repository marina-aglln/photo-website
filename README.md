# Photography Portfolio Website
A simple and easy to navigate website for the photographer, i.e. me, with the focus of the photographs. It's still in the works, updates are rolled out gradually.

**Live website:** [marinatakespictures.com](https://marinatakespictures.com/)

Built with HTML, CSS, and JavaScript, hosted on Cloudflare and deployed automatically from this repository.

## Purpose
The website is built to substitute a PDF portfolio. 

A PDF portfolio is a common and efficient way to present a photographer's work when a photographer works within the space of fashion and advertising but insufficient when a photographer works within the art space. On top of that, since a website allows a more structured view on a photographer's work with more work being shown, it's a great tool for a photographer to work with their archive and have a bird's eye view on their own work.

## Project Goals
- move from a website builder to owning the code for the website;
- simplify the website design, so that the focus is on the photography, not on the website design;
- cut costs: building a website and owning the code is cheaper than making it with a website builder.

## Pages

|Page      |File	               |What it does                                                                                      |
|:---------|:--------------------|:-------------------------------------------------------------------------------------------------|
|Home      |index.html           |Name split across the top and bottom of the screen, with an auto-advancing slideshow in the middle|
|About  	 | about.html.         |Short bio, exhibitions, print publications, awards                                                |
|Work	     |work.html	           |Grid of gallery covers, newest first. Each card opens its gallery                                 |
|Contacts	 |contacts.html        |Email (click to copy) and Instagram (opens in a new tab, or the app on a phone)                   |
|Galleries |one file per gallery |Full photo set for one project. The "WORK" heading links back to the Work page                    |

## Structure
```
photo-website/
├── index.html                  Home
├── about.html                  About
├── work.html                   Work (gallery grid)
├── contacts.html               Contacts
├── <gallery-slug>.html         One page per gallery
│
├── style.css                   The only stylesheet
├── layout.js                   Measures fixed header height and sidebar width
├── script.js                   Homepage slideshow
├── contacts.js                 Click-to-copy email
├── contacts-photo.js           Hides the Contacts photo when there's no room
├── gallery-images.js           Detects portrait/landscape for gallery photos
│
└── assets/
    ├── fonts/                  Anton and Inter, self-hosted
    ├── pdf/                    PDFs of print publications (not uploaded yet as per Nov 17, 2026)
    └── images/
        ├── home/               slide-01.webp … slide-12.webp
        ├── galleries/
        │   └── <gallery-slug>/ cover.webp, 01.webp, 02.webp, …
        └── contacts.webp
```

## Design Concept
The website design is inspired by *a catalogue of concrete*, *a white cube space* typical for a contemporary art gallery, and *brutalist architecture*.

<img width="700" height="700" alt="8c560f25da0a8a1f22ecf2b7adffee91-3423698235" src="https://github.com/user-attachments/assets/320b8213-ddbd-403f-a86e-61aeb3ffc8e5" />

## Design System
**Colors** are defined as variables at the top of style.css
|Role |Variable |Value |
|:----|:--------|:-----|
|Background |--color-bg |#71736E
|Text |--color-text |#FDFF87
|Hover/Pressed |--color-interactive |#87EDFF

Contrast ratio: 4.53:1 — passes WCAG AA for normal text (needs 4.5:1) and large text.

## Copyright
Photographs and text © Marina Agliullina. All rights reserved. Please don't reuse them without permission.
