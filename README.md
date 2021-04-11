# web_blog
Using Rails framwork  have made a Blog Application, You need to select a user to crud post, comment or add reactions to comment



##  SetUp
- Install bundler
  - `gem install bundler`
- Clone the repository
  - `git clone https://github.com/anishshah615/web_blog.git`
- Change to the GraphQL Blog API directory
  - `cd web_blog`
- Install the gem dependencies
  - `bundle install`
- Install react packages
  - `yarn`
- Create and migrate the database
  - `rails db:create`
  - `rails db:migrate`
- Create fake seed data
  - `rails db:seed`
- Start the server
  - `rails s`