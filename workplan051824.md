# Team Structure:
  -   Set a specific time and date when deciding when to meet
  -   Pair programming
  -   Use github projects to assign parts
  -   Design, CSS
      -   Sebastian P
      -   Michi Wada
      -   Vivian Kwan
      -   Borna Hemmaty
      -   Fanglei Gao
  -   Documentation
      -   Claire Andolina
  -   Features/Development
      -   Michi Wada
      -   Dylan Olivares
      -   Borna Hemmaty
      -   Vivian Kwan
      -   Sebastian P
      -   Fanglei Gao
  -   Testing
      -   Borna Hemmaty
      -   Dylan Olivares
      -   Claire Andolina

# Sprint:
  -   1 week sprints
  -   Separate retrospection and planning

# List down all work effort
  -   Design
      -   Update UI to adapt to extra fortunes 			(High Priority, 3H)  **DONE**
      -   Login page UI 						(High Priority, 4H)
  -   Dev
      -   Adding extra categories for types of fortune telling 	(High Priority, 6H)
      -   Implement Chatgpt into fortune telling (MAYBE) 	(Medium Priority, 10H) 
      -   Online functionality 					(High Priority, 6H)
      -   3 Tier Architecture (Backend-Frontend-Database)	(High Priority, 10H)
      -   Explanations page for cards				(Medium Priority, 3H)
  -   Testing
      -   Bug fix!! Save readings cannot go back to menu 	(Low Priority, 4H)  **DONE**

# Sequencing Information
  -   Sprint 0: Planning, dividing tasks, and organizing groups by interest
  -   Sprint 1: Tasks - 3 Tier Architecture, Login UI
      -   Pair Programming, with either 2-3 people working on Frontend or Backend of refactor.
          -   Front end:
              -   Fanglei Gao
              -   Michi Wada
          -   Back end:
              -   Borna Hemmaty
              -   Dylan Olivares
          -   Database:
              -   Claire Andolina
              -   Vivian Kwan
          -   One group working on Login UI
              -   Sebastian Pamudji
              -    Devin Muzzy
  -   Sprint 2: Online/Login functionality, Saving fortunes into db
  -   Sprint 3: Extra categories
          -   ADR documentation (specification of what design choices we made and why)
          -   We will be allocating people to focus primarily on backend and database
          -   These tasks will need to be completed in order
          -   Part 1 Link frontend and backend of login/sign up *Wednesday Deadline: Fanglei, Sebastian      
              -   Add button listeners to call to backend API
          -   Part 2 Save login status until they sign out / logout function: Sebastian, Borna
              -   Implement browser cookies to save user status
              -   HTML, CSS, JS of logout button
              -   Logic for different login button displays based on if guest or registered user
          -   Part 3 Persistence of saved fortunes: Vivian, Claire
              -   Secure storage and retrieval of fortunes (no overlap with other user’s histories)
          -   Part 4 Username/email validation: Michi
              -   Check duplicate emails / usernames
              -   Logic to handle unregistered username/email and password combinations in login page

  -   Sprint 4: Explanation page, ChatGPT
