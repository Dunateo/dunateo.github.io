+++
title = "Plug In and Power Up: My WordPress Odyssey"
date = "2024-09-23"
description = "Ever wondered how a simple WordPress plugin could turn into a full-blown microservices adventure? Me too! This internship threw me into the deep end of enterprise-level tech..."

[extra]
author = { name = "Dunateo", social= "https://github.com/Dunateo" }
+++


## Internship Lottery

First year of my master's degree. 
You know the process to level up, you need that internship experience. Four months of real world tech immersion was the goal.

I cast my net wide, hoping for some interesting bites. But the internship sea was pretty quiet. After what felt like ages, I finally got a response from a big firm. Great news, right? Well, sort of.

Here's the twist - the only subject left was this obscure Java development thing. It was about as related to my team's work as a fish is to mountain climbing.

But hey, I thought to myself, "It's just Java, right? Can't be that bad." Plus, I'd be surrounded by computer science wizards. Who knows? Maybe I'd absorb some real-world dev skills just by being close by.

Sometimes, the most unexpected projects lead to the most interesting outcomes.

<div align="center">
  <img src="https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExYnhmcmUzY3VmcnBobzZ1bGxseHVua294ejVhYnA1Y3djaHp5eXkzbyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Z3VgQu8hkVeB1bakS9/giphy.gif" alt="Wizard coding gif">
</div>


## Wordpress Plugin Development

So, there I was, stepping into the office for the first time. I met the team bunch of cool dudes with tons of Java experience under their belts from developing tactical information systems. You know, the kind of stuff that makes you go "Whoa, these guys are the real deal!"

They laid out my mission for me, and boy, it was a challenge! A WordPress plugin to for the front-end and create new pages, plus a Java backend to crunch numbers and store data. Talk about jumping into the deep end!

The main goal? Simple on paper we needed to gather info on employees' skills. Why? To figure out if someone needed a crash course in the latest tech, or to know who to call when you need a COBOL wizard (because those still exist, apparently).

<div align="center">
<img src="https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExa3M1eWZieGs3OW9wOGFnaXRhcG8wYWpxbWFudzdjZGN3ZDViNmw2ZiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/qsMnVPVX9WDI1obJWB/giphy.gif" alt="Magical skills">
</div>

Now, this is where things got interesting. I started by whipping up some web prototypes in an old-school Figma-like tool. Then, I had to implement my designs on different pages using the company's CSS.

My plugin was basically hijacking the WordPress site, turning it into a single-purpose machine. I had to dive deep into hook functions. Luckily, WordPress is like an open book well-documented and the PHP code is readable enough that you don't need a decoder.

Knowing I'd be in for a wild ride with Ajax requests for dynamic data later on, I made sure to leave some breadcrumbs. I linked up action buttons to JavaScript files, preparing for the battle with asynchronous data display.

## Architecture Odyssey

Thinking I'd nailed the front-end (spoiler: it was already a pain). Now I had to develop a full RESTful API with 4 different flavors, one for each "role" (yeah, the frontend had the same deal 4 different pages). Oh, and I needed a way to store all that data and track changes. Fun times!

Lucky me, they had some up-to-date CSV files lying around, and those SpringBoot lessons from earlier suddenly became my best friends.

But there is still one point, I had no clue how to secure these data flows. Cause frontend and backend are not on the same server and leaving an API without authentication is like leaving your front door wide open.

To spice things up, the specs threw in a couple of curveballs:
- backend had to expose one specific port and communicate only through this channel
- deployment needed to be a breeze

That's when I decided to level up my project with some tools that caught my eye in class: containerization with Docker and Docker Compose. Because why make life easy when you can make it interesting, right?

The architecture I cooked up was like a tech smoothie: WordPress for authentication and frontend display/data refreshing, with the WordPress backend juggling JWT authentication tokens for each role.

On the backend side, I went full microservice : a front reverse proxy, the API, and Keycloak. Why Keycloak? Well, they wouldn't let me use the Enterprise SSO and weren't keen on creating a service account. So, I had to deploy a tank in a Polly Pocket house to create service accounts and verify my JWT tokens.

<div align="center">
<img src="https://github.com/Dunateo/dunateo.github.io/blob/main/content/images/wp_plug_archi.png?raw=true" alt="Architecture Diagram">
</div>

The final diagram with 4 different networks to isolate and have control on communications between microservices.

Oh, and did you spot the elephant in the room? The Kong service! 

## Kong Experience

Let's rewind a bit to those specifications. Remember that one about the backend needing to expose a specific port? Yeah, that's where things got interesting.

I needed something to play traffic cop for my microservices translating URLs with one port to the right service and checking if the request was legit. 

At first, we went full-on Nginx. It had the reverse proxy right out of the box, but for the fancy API gateway stuff like JWT authentication, they wanted us to cough up some cash.

That's when I stumbled upon Kong. It's like Nginx's cooler cousin built on the same foundation but with some extra tricks. What really hooked me was its "Services" and "Routes" concept. On paper, it looked like a breeze to set up. Plus, it had a Keycloak plugin to make OAuth requests a walk in the park.

But here's where theory and practice had a bit of a falling out. Configuring Kong through files was a real headache every change seemed to break something. I ended up having to use Kong's configuration API and whip up a whole script to automate the installation.

The cool thing ? Kong let me fine-tune things to my heart's content. Take CORS preflight requests, for example. I needed those to use the API from WordPress, and Kong was all like, "No problem, I've got you covered."

Now, if I had more time, I would've loved to play around with Kong's load balancer feature. It would've been the perfect excuse to dive into the world of orchestrators and implement some fancy load balancing strategies for those high-demand scenarios.

## Javatesy

This internship turned out to be quite the tech adventure, packed with unexpected challenges and learning opportunities. I dove into technologies I hadn't initially planned on exploring, and it was an eye-opening experience.

Coming from a cybersecurity master's program, I got a firsthand look at why WordPress plugins are so often targeted by vulnerabilities. The level of control they offer is impressive, but it also means that a small error, especially when handling user inputs, can quickly lead to security issues.

Of course, there's always room for improvement. Implementing SSL/TLS between microservices, using a more robust orchestration tool like Swarm or Kubernetes, or streamlining the architecture by directly using the SSO these are all areas that could be enhanced.

Considering I had just 4 months to develop a plugin, build a backend, run code tests, and write up my report, I'm quite proud of the final result. The best part? The company actually had a real use case for it.

<div align="center">
<img src="https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExbzVncDhzZ3ZkdWExNWNyNG43cnJnYXF0YTYyaHdobTF4N3JoZnJkciZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/gRZM3bBmjchSxqUKCP/giphy-downsized-large.gif" alt="Java Morning">
</div>
PS: Shout-out to jf for morning coffee.