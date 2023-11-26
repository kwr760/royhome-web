# Overview

The main purpose of this project to provide a point to display my skills in the form of hosting my resume.

# Features

Mainly, this is a React frontend with a Spring Kotlin backend.  There are two server, a web server hosting the
SSR server and a spring api server connecting to a Postgres database.

I wanted to build a website so that I could piece together each individual technology instead of stumbling with
small pieces on knowledge with small chunks of technology usually given in an agile process.

Obviously this can be done in a simpler way and in ways it should.  For example, I am storing my resume in a Postgres
database, which is not needed.  Rendering the resume from the web server is simpler and would be easier for me to
maintain the application.

But, I wanted to set up these technologies not only to learn them, but also as I add new functionality it will be
easier for me to add more complex features.

## Server Side Rendering

My web server uses SSR, this means that the site is rendered first on the server and then sends it to the browser.
This is done so that google and presumable other sites can collect SEO information.  It is both simple and complex.
The complexity of it getting it work the first time and then minimizes the work needed when adding functionality.
Ideally, the SSR would be transparent to how engineers want develop a React web site.

This complexity is displayed with the authentication and this authentication affects what is allowed to be
rendered.  Considering how little my website does with authentication, it was a lot of work without a lot of
immediate gain.

## Authentication

I added authentication primary so that I could host my site through continuous delivery.  I use my login access
to access the new content while keeping the stable content available to everyone else.

My initial intention was to give access to limited people who authenticated themselves and which I knew might be
interested in specific content.  For example, my friends or colleagues, would have different content available to
them.  But I decided that all the content will be accessible to everyone.

## API Server

Even though my site does not need and would be easier to focus solely on the frontend, I wanted a backend so that
future projects could utilize it.  The API server is completely separate from by web server, it is sharing the
url.  I have two `royk.us` and `royhome.net`.  The API server prepends `api.<url>` to these urls.  I am using
nginx as a reverse proxy direct the traffic to the appropriate server.

## Database

The API server is using a Postgres database.  For me the choice was a toss up between MySQL and Postgres as I
wanted a relational database to better to describe that data I am storing.   I choose Postgres, as it described
to be more expressive.  This may be irrelevant as I am using hibernate and flyway which probably generalizes the
database to something common to more database types.

Ideally I want to maintain my database as code, and I have a fair starting point.  But the upgrade of the database
is not automated on release as of yet.

## Hosted / Continuous Development

My initial reaction or intention was to host my site locally on an old machine of mine.  But I decided to use
linode, for its predictable cost.  I develop on my local Linux box, pushing my branch to github and travis
monitors the repository, triggering the push/merge to master to deliver my code to my linode machine.

As I deliver the code, I verify the change through automation and on success deliver to my production box.
Delivering code in less than 15 minutes.  Recently I added blue/green deployment so that my downtime is the time
it takes nginx to restart.

## Material-UI

Initially, my site used reactstrap.  It worked well, but felt that it was a little old.  I started to look
for a replacement.  I choose Material-UI.  Though I'm just beginning to use it, the experience has been good.

An example, is that my implementation of dark mode uses a theme and it is much cleaner then my previous solution.

## Quality

My code linted, typed, and tested.  It makes my development life simpler.

Initially I typed my javascript with flow-typed.  I did not enjoy it, and have since I wanted to do one of two
things, change to typescript or just get rid of typing.  typescript is much easier to use, and well what I was
expecting.

I am still at 100% unit test coverage, so far so good.  Eventually I'll need to consider adding more tests.
Adding an E2E or integration test framework will be another set of challenges.
