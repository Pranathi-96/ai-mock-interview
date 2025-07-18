"use server"

// This file simulates ChatGPT-like functionality for generating interview questions
// In a production environment, this would connect to the actual OpenAI API

// Large database of interview questions by category and difficulty
const questionDatabase = {
  technical: {
    frontend: {
      easy: [
        "What is the difference between HTML and XHTML?",
        "Explain the box model in CSS.",
        "What are semantic HTML tags and why are they important?",
        "What is the difference between inline and block elements?",
        "Explain the concept of CSS specificity.",
        "What is responsive web design?",
        "What are media queries and how do you use them?",
        "Explain the difference between let, const, and var in JavaScript.",
        "What is DOM manipulation?",
        "How do you center an element horizontally and vertically in CSS?",
        "What is the purpose of the alt attribute in image tags?",
        "Explain the concept of CSS Flexbox.",
        "What is the difference between == and === in JavaScript?",
        "What are pseudo-classes in CSS?",
        "Explain what ARIA roles are and why they're important.",
      ],
      medium: [
        "Explain how React's virtual DOM works and why it's beneficial.",
        "What are closures in JavaScript and how would you use them?",
        "Explain the concept of CSS Grid and how it differs from Flexbox.",
        "What is event delegation in JavaScript?",
        "Explain the concept of progressive enhancement.",
        "What are Web Components?",
        "How does browser rendering work?",
        "Explain the concept of CSS preprocessors and their benefits.",
        "What is the JavaScript event loop?",
        "How would you optimize a website's performance?",
        "Explain the difference between controlled and uncontrolled components in React.",
        "What are Higher-Order Components in React?",
        "Explain the concept of CSS-in-JS.",
        "What is code splitting in modern web applications?",
        "How do you handle form validation in React?",
      ],
      hard: [
        "Explain the architecture of a complex React application you've built.",
        "How would you implement a virtual scrolling list for thousands of items?",
        "Explain how you would build a design system from scratch.",
        "How would you implement authentication and authorization in a React application?",
        "Explain your approach to testing React components.",
        "How would you optimize the performance of a React application?",
        "Explain how you would implement a state management solution without using Redux.",
        "How would you handle internationalization in a large-scale application?",
        "Explain your approach to implementing accessibility in a complex web application.",
        "How would you architect a micro-frontend application?",
        "Explain how you would implement a custom hook for complex form validation.",
        "How would you handle real-time updates in a React application?",
        "Explain your approach to implementing animations in React.",
        "How would you handle error boundaries and fallbacks in a React application?",
        "Explain how you would implement a design system that supports both light and dark modes.",
      ],
    },
    backend: {
      easy: [
        "What is the difference between GET and POST HTTP methods?",
        "Explain what RESTful APIs are.",
        "What is a database index?",
        "Explain the concept of middleware in web development.",
        "What is the difference between SQL and NoSQL databases?",
        "What is CORS and why is it important?",
        "Explain what JSON Web Tokens (JWT) are.",
        "What is the purpose of environment variables?",
        "Explain the concept of database normalization.",
        "What is the difference between authentication and authorization?",
        "What is a stateless API?",
        "Explain what API rate limiting is and why it's important.",
        "What is the purpose of HTTP status codes?",
        "Explain what a webhook is.",
        "What is the difference between synchronous and asynchronous programming?",
      ],
      medium: [
        "Explain the principles of RESTful API design.",
        "What are microservices and how do they differ from monolithic architecture?",
        "Explain the concept of database transactions and ACID properties.",
        "What is caching and how would you implement it in a web application?",
        "Explain the concept of ORM (Object-Relational Mapping).",
        "What is the N+1 query problem and how would you solve it?",
        "Explain the concept of database sharding.",
        "What are design patterns and can you explain a few common ones?",
        "How would you handle error logging and monitoring in a production environment?",
        "Explain the concept of message queues and when you would use them.",
        "What is horizontal vs. vertical scaling?",
        "Explain the concept of database indexing strategies.",
        "What is the CAP theorem?",
        "How would you implement authentication in a microservices architecture?",
        "Explain the concept of database connection pooling.",
      ],
      hard: [
        "How would you design a scalable API for a social media platform?",
        "Explain how you would implement a distributed caching system.",
        "How would you design a system that handles millions of concurrent users?",
        "Explain your approach to implementing a fault-tolerant microservices architecture.",
        "How would you design a database schema for a complex e-commerce platform?",
        "Explain how you would implement a real-time notification system.",
        "How would you design an API gateway for a microservices architecture?",
        "Explain your approach to implementing a distributed transaction system.",
        "How would you design a system for processing large volumes of data in real-time?",
        "Explain how you would implement a recommendation engine.",
        "How would you design a system that ensures high availability and disaster recovery?",
        "Explain your approach to implementing a secure authentication system.",
        "How would you design a system for handling payments securely?",
        "Explain how you would implement a search engine with complex filtering capabilities.",
        "How would you design a system that complies with data privacy regulations like GDPR?",
      ],
    },
    fullstack: {
      easy: [
        "What is the difference between client-side and server-side rendering?",
        "Explain the concept of MVC architecture.",
        "What is a RESTful API?",
        "Explain what CRUD operations are.",
        "What is the purpose of version control systems like Git?",
        "Explain the concept of responsive design.",
        "What is the difference between a library and a framework?",
        "Explain what API endpoints are.",
        "What is the purpose of package managers like npm or yarn?",
        "Explain the concept of database migrations.",
        "What is the difference between development, staging, and production environments?",
        "Explain what a CDN is and why it's useful.",
        "What is the purpose of a .gitignore file?",
        "Explain what cross-browser compatibility means.",
        "What is the purpose of a linter?",
      ],
      medium: [
        "Explain the concept of server-side rendering vs. client-side rendering vs. static site generation.",
        "What is the JAMstack architecture?",
        "Explain how you would implement authentication and authorization in a full-stack application.",
        "What is the purpose of containerization tools like Docker?",
        "Explain the concept of CI/CD pipelines.",
        "What are webhooks and how would you implement them?",
        "Explain the concept of GraphQL and how it differs from REST.",
        "What is the purpose of service workers?",
        "Explain the concept of progressive web apps (PWAs).",
        "What is the purpose of a reverse proxy?",
        "Explain the concept of database indexing strategies.",
        "What is the purpose of load balancers?",
        "Explain the concept of serverless architecture.",
        "What is the purpose of content security policy (CSP)?",
        "Explain the concept of database connection pooling.",
      ],
      hard: [
        "How would you architect a full-stack application that needs to scale to millions of users?",
        "Explain your approach to implementing a real-time collaborative editing feature.",
        "How would you design a system that ensures high availability and disaster recovery?",
        "Explain your approach to implementing a secure payment processing system.",
        "How would you architect a system that handles complex data relationships and queries efficiently?",
        "Explain your approach to implementing a multi-tenant SaaS application.",
        "How would you design a system that handles file uploads and processing efficiently?",
        "Explain your approach to implementing a search functionality with complex filtering and sorting.",
        "How would you architect a system that integrates with multiple third-party services?",
        "Explain your approach to implementing a recommendation engine.",
        "How would you design a system that handles internationalization and localization?",
        "Explain your approach to implementing a feature flagging system.",
        "How would you architect a system that complies with data privacy regulations?",
        "Explain your approach to implementing a monitoring and alerting system.",
        "How would you design a system that handles complex workflows and state machines?",
      ],
    },
  },
  behavioral: {
    leadership: {
      easy: [
        "Tell me about yourself.",
        "What are your strengths and weaknesses?",
        "How do you handle stress and pressure?",
        "Describe your ideal work environment.",
        "How do you prioritize your work?",
        "What motivates you?",
        "How do you define success?",
        "What are your career goals?",
        "How do you stay organized?",
        "What is your communication style?",
        "How do you handle feedback?",
        "What are you passionate about?",
        "How do you handle change?",
        "What are your expectations from a manager?",
        "How do you maintain work-life balance?",
      ],
      medium: [
        "Tell me about a time when you had to lead a team.",
        "Describe a situation where you had to make a difficult decision.",
        "Tell me about a time when you had to resolve a conflict within your team.",
        "Describe a project where you had to work under a tight deadline.",
        "Tell me about a time when you had to motivate a team member.",
        "Describe a situation where you had to delegate tasks effectively.",
        "Tell me about a time when you had to provide constructive feedback.",
        "Describe a project where you had to coordinate multiple stakeholders.",
        "Tell me about a time when you had to adapt to a significant change.",
        "Describe a situation where you had to prioritize competing demands.",
        "Tell me about a time when you had to make a decision with limited information.",
        "Describe a project where you had to overcome obstacles.",
        "Tell me about a time when you had to influence others without direct authority.",
        "Describe a situation where you had to build consensus among team members.",
        "Tell me about a time when you had to handle a crisis situation.",
      ],
      hard: [
        "Tell me about a time when you had to lead a team through a challenging project. What was your approach and what was the outcome?",
        "Describe a situation where you had to make a difficult decision that affected your entire team or organization. How did you approach it and what did you learn?",
        "Tell me about a time when you had to resolve a complex conflict within your team that was affecting productivity. How did you handle it and what was the result?",
        "Describe a project where you had to work under significant constraints (time, budget, resources). How did you lead your team to success despite these challenges?",
        "Tell me about a time when you had to motivate a team during a period of low morale or significant change. What strategies did you use and how effective were they?",
        "Describe a situation where you had to delegate critical tasks to team members who were initially reluctant or unprepared. How did you ensure success?",
        "Tell me about a time when you had to provide difficult feedback to a high-performing team member. How did you approach it and what was the outcome?",
        "Describe a project where you had to coordinate multiple stakeholders with conflicting priorities. How did you manage these relationships and what was the result?",
        "Tell me about a time when you had to adapt your leadership style to accommodate a diverse team with different working styles. What adjustments did you make and how effective were they?",
        "Describe a situation where you had to prioritize competing demands with significant business impact. How did you make these decisions and what was the outcome?",
        "Tell me about a time when you had to make a strategic decision with incomplete information that had long-term implications. What was your approach and what happened?",
        "Describe a project where you had to overcome significant obstacles that threatened its success. What actions did you take and what was the result?",
        "Tell me about a time when you had to influence senior leadership to adopt a new approach or strategy. How did you make your case and what was the outcome?",
        "Describe a situation where you had to build consensus among team members with strong opposing viewpoints. What techniques did you use and how successful were you?",
        "Tell me about a time when you had to handle a crisis situation that threatened your team's or organization's reputation. How did you manage it and what was the result?",
      ],
    },
    teamwork: {
      easy: [
        "How do you work in a team?",
        "What role do you usually take in a team project?",
        "How do you handle disagreements with team members?",
        "What makes a good team member?",
        "How do you contribute to a positive team environment?",
        "What is your approach to collaboration?",
        "How do you communicate with team members?",
        "What do you do when a team member isn't pulling their weight?",
        "How do you share credit for team accomplishments?",
        "What is your experience with remote or distributed teams?",
        "How do you build relationships with new team members?",
        "What do you do when you disagree with a team decision?",
        "How do you handle receiving criticism from team members?",
        "What is your approach to giving feedback to peers?",
        "How do you adapt to different team dynamics?",
      ],
      medium: [
        "Tell me about a time when you had to work with a difficult team member.",
        "Describe a situation where you had to step up and take initiative in a team project.",
        "Tell me about a time when you had to compromise for the good of the team.",
        "Describe a project where you had to collaborate with multiple departments.",
        "Tell me about a time when you had to give constructive feedback to a peer.",
        "Describe a situation where you had to build consensus within a team.",
        "Tell me about a time when you had to adapt to a team's working style.",
        "Describe a project where you had to rely heavily on teamwork to succeed.",
        "Tell me about a time when you had to mediate a conflict between team members.",
        "Describe a situation where you had to integrate into an established team.",
        "Tell me about a time when you had to work with a cross-functional team.",
        "Describe a project where you had to coordinate work across different time zones.",
        "Tell me about a time when you had to support a team decision you didn't agree with.",
        "Describe a situation where you had to improve team communication.",
        "Tell me about a time when you had to work with a team under pressure.",
      ],
      hard: [
        "Tell me about a time when you had to work with a team member who consistently undermined the team's efforts. How did you handle it and what was the outcome?",
        "Describe a situation where you had to step up and take initiative in a team project that was failing. What actions did you take and what was the result?",
        "Tell me about a time when you had to make a significant compromise that went against your personal preferences for the good of the team. How did you handle it and what did you learn?",
        "Describe a complex project where you had to collaborate with multiple departments with different priorities and working styles. How did you ensure effective collaboration and what was the outcome?",
        "Tell me about a time when you had to give difficult constructive feedback to a peer who wasn't receptive. How did you approach it and what was the result?",
        "Describe a situation where you had to build consensus within a team that had strong opposing viewpoints on a critical issue. What techniques did you use and how successful were you?",
        "Tell me about a time when you had to adapt to a team's working style that was very different from your preferred approach. What adjustments did you make and how effective were they?",
        "Describe a high-stakes project where the success depended entirely on effective teamwork. How did you contribute to the team dynamic and what was the outcome?",
        "Tell me about a time when you had to mediate a serious conflict between team members that was affecting the entire team's productivity. How did you handle it and what was the result?",
        "Describe a situation where you had to integrate into an established team that was resistant to new members or ideas. How did you overcome this challenge and what was the outcome?",
        "Tell me about a time when you had to work with a cross-functional team where members had different technical backgrounds and communication styles. How did you ensure effective collaboration?",
        "Describe a global project where you had to coordinate work across different time zones, languages, and cultures. What challenges did you face and how did you overcome them?",
        "Tell me about a time when you had to support and implement a team decision you strongly disagreed with. How did you handle it and what was the result?",
        "Describe a situation where you identified and addressed a fundamental communication issue within your team that was causing significant problems. What actions did you take and what was the outcome?",
        "Tell me about a time when you had to work with a team under extreme pressure with high stakes. How did you maintain team cohesion and what was the result?",
      ],
    },
    problemSolving: {
      easy: [
        "How do you approach problem-solving?",
        "What do you do when you're stuck on a problem?",
        "How do you make decisions?",
        "What resources do you use when solving problems?",
        "How do you prioritize problems that need to be solved?",
        "What is your approach to troubleshooting?",
        "How do you handle ambiguity?",
        "What do you do when you don't have all the information you need?",
        "How do you balance speed and quality when solving problems?",
        "What is your approach to learning new skills or technologies?",
        "How do you stay organized when working on complex problems?",
        "What do you do when your initial solution doesn't work?",
        "How do you validate your solutions?",
        "What is your approach to preventive problem-solving?",
        "How do you incorporate feedback into your problem-solving process?",
      ],
      medium: [
        "Tell me about a time when you had to solve a complex problem.",
        "Describe a situation where you had to think outside the box.",
        "Tell me about a time when you had to make a decision with limited information.",
        "Describe a project where you had to overcome significant obstacles.",
        "Tell me about a time when you had to troubleshoot a technical issue.",
        "Describe a situation where you had to analyze data to solve a problem.",
        "Tell me about a time when you had to prioritize multiple problems.",
        "Describe a project where you had to learn a new skill or technology quickly.",
        "Tell me about a time when your initial approach to a problem didn't work.",
        "Describe a situation where you had to solve a problem under time pressure.",
        "Tell me about a time when you had to solve a problem that affected multiple teams.",
        "Describe a project where you had to balance competing priorities.",
        "Tell me about a time when you had to solve a problem with limited resources.",
        "Describe a situation where you had to implement a solution that wasn't ideal.",
        "Tell me about a time when you had to solve a problem that had no precedent.",
      ],
      hard: [
        "Tell me about a time when you had to solve a complex problem that had stumped others in your organization. What was your approach and what was the outcome?",
        "Describe a situation where you had to develop a completely novel solution because conventional approaches wouldn't work. What was your thinking process and what was the result?",
        "Tell me about a time when you had to make a critical decision with very limited information and significant potential consequences. How did you approach it and what happened?",
        "Describe a project where you encountered multiple significant obstacles that threatened its success. How did you systematically overcome these challenges and what was the outcome?",
        "Tell me about a time when you had to troubleshoot a complex technical issue that was causing significant business impact. What was your methodology and how effective was it?",
        "Describe a situation where you had to analyze large volumes of data or complex information to solve a critical business problem. What techniques did you use and what insights did you discover?",
        "Tell me about a time when you had to prioritize multiple high-priority problems with limited resources. How did you make these decisions and what was the impact?",
        "Describe a project where you had to quickly master a new, complex skill or technology that was essential for success. What was your learning approach and how did you apply it?",
        "Tell me about a time when your initial approach to a significant problem completely failed. How did you recover, what did you learn, and what was the eventual outcome?",
        "Describe a situation where you had to solve a critical problem under extreme time pressure. What trade-offs did you make and how did you ensure quality?",
        "Tell me about a time when you had to solve a problem that affected multiple teams or departments with different priorities. How did you navigate these complexities and what was the result?",
        "Describe a project where you had to balance competing priorities with significant business implications. How did you make these trade-offs and what was the outcome?",
        "Tell me about a time when you had to solve a complex problem with severely constrained resources. What creative approaches did you take and how successful were they?",
        "Describe a situation where you had to implement a solution that wasn't ideal due to constraints. How did you mitigate the risks and what was the result?",
        "Tell me about a time when you had to solve a novel problem that had no precedent in your organization. How did you approach it and what systems or processes did you establish for the future?",
      ],
    },
  },
  hr: {
    career: {
      easy: [
        "Why are you interested in this position?",
        "Why do you want to work for our company?",
        "Where do you see yourself in 5 years?",
        "What are your salary expectations?",
        "Why are you leaving your current job?",
        "What are you looking for in your next role?",
        "How did you hear about this position?",
        "What do you know about our company?",
        "What is your ideal work environment?",
        "What are your career goals?",
        "What attracted you to this industry?",
        "How does this position fit into your career path?",
        "What are your expectations from this role?",
        "Why should we hire you?",
        "What makes you unique?",
      ],
      medium: [
        "How do you stay updated with industry trends?",
        "What challenges are you looking for in this position?",
        "How would your colleagues describe your work style?",
        "What aspects of our company culture appeal to you?",
        "How do you align with our company's mission and values?",
        "What questions do you have about our company?",
        "How do you handle work-life balance?",
        "What are your long-term career aspirations?",
        "How do you measure success in your career?",
        "What professional development opportunities are you seeking?",
        "How do you handle job-related stress?",
        "What are your expectations from a manager?",
        "How do you approach continuous learning?",
        "What do you think sets our company apart from our competitors?",
        "How would you contribute to our team?",
      ],
      hard: [
        "Given your career trajectory so far, why is this specific role the right next step for you, and how does it align with your long-term professional goals?",
        "Our company is currently navigating [specific industry challenge]. Based on your experience and research, how would you contribute to addressing this challenge in this role?",
        "We're looking for someone who can grow with our organization. Can you describe your professional development plan for the next 3-5 years and how this role fits into that plan?",
        "Our company values include [specific values]. Can you provide specific examples from your career that demonstrate how you've embodied similar values in your work?",
        "What aspects of our company's strategic direction particularly resonate with you, and how do you see yourself contributing to that direction in this role?",
        "We're interested in candidates who can bring fresh perspectives. Based on your research of our company, what opportunities do you see for innovation or improvement in our [specific area]?",
        "This role requires balancing [specific competing priorities]. Can you describe your approach to managing similar competing priorities in your career and what you learned from those experiences?",
        "Our company is committed to [specific initiative, like diversity and inclusion]. How have you contributed to similar initiatives in your career, and how would you continue that work here?",
        "What specific aspects of our company culture attracted you to this position, and how do you see yourself both adapting to and enhancing that culture?",
        "This role involves [specific challenge]. Can you walk me through how you've handled similar challenges in your career and what strategies you would apply here?",
        "We're looking for someone who can hit the ground running but also grow with the role. What would your first 90 days look like in this position, and how would you measure your success?",
        "Our industry is experiencing [specific change or disruption]. How have you navigated similar changes in your career, and how would you apply those lessons in this role?",
        "What do you consider to be the most significant trends affecting our industry right now, and how do you stay informed about these developments?",
        "This role requires collaboration with [specific departments or stakeholders]. Can you describe your experience working with similar stakeholders and your approach to building effective cross-functional relationships?",
        "We value continuous improvement. Can you describe a specific instance where you identified and implemented a significant improvement in a process or system in your previous role?",
      ],
    },
    company: {
      easy: [
        "What do you know about our company?",
        "Why do you want to work for us?",
        "What interests you about our products/services?",
        "How did you hear about our company?",
        "What do you think sets our company apart from our competitors?",
        "What do you know about our company culture?",
        "Have you used our products/services before?",
        "What do you think about our company's mission statement?",
        "Do you know anyone who works for our company?",
        "What do you think about our company's recent news or announcements?",
        "What do you know about our company's history?",
        "What do you think about our company's leadership?",
        "What do you know about our company's market position?",
        "What attracted you to our company?",
        "What do you think about our company's website or social media presence?",
      ],
      medium: [
        "How do you think you can contribute to our company's goals?",
        "What aspects of our company culture appeal to you?",
        "How do you align with our company's mission and values?",
        "What do you think about our company's approach to [specific aspect]?",
        "How do you see our company evolving in the next few years?",
        "What challenges do you think our company faces in the current market?",
        "How do you think our company compares to our competitors in terms of [specific aspect]?",
        "What do you think about our company's product/service roadmap?",
        "How do you think our company can improve its [specific aspect]?",
        "What do you think about our company's approach to innovation?",
        "How do you think our company's values are reflected in our products/services?",
        "What do you think about our company's approach to customer service?",
        "How do you think our company can expand its market reach?",
        "What do you think about our company's approach to employee development?",
        "How do you think our company can maintain its competitive edge?",
      ],
      hard: [
        "Based on your research and understanding of our industry, what do you see as the three most significant challenges our company will face in the next 2-3 years, and how would your skills and experience help us address these challenges?",
        "Our company recently [specific strategic move, acquisition, product launch, etc.]. What's your analysis of this decision, and how do you think it positions us in the market compared to our key competitors?",
        "We're currently focusing on [specific strategic initiative]. Based on your understanding of our company and industry, how would you evaluate this strategy, and what adjustments might you suggest?",
        "Our company values include [specific values]. Can you provide specific examples of how you've seen these values effectively implemented in organizations, and how you would contribute to strengthening these values here?",
        "What aspects of our company's strategic direction particularly resonate with you, and where do you see potential blind spots or areas for reconsideration based on your industry experience?",
        "We're interested in candidates who understand our market position. How would you characterize our competitive advantage, and what strategies would you suggest to strengthen it further?",
        "Our company is navigating the transition from [current state] to [desired future state]. What insights can you offer from your experience that would help us manage this transition effectively?",
        "Based on your research, how would you evaluate our company's approach to innovation compared to industry leaders, and what specific changes might you suggest to enhance our innovation capabilities?",
        "Our company has a specific approach to [customer experience, product development, etc.]. How does this approach compare to best practices you've observed or implemented, and what refinements might you suggest?",
        "We're considering expanding into [new market or product area]. Based on your understanding of our company and the market, what would be your assessment of this opportunity and the key factors we should consider?",
        "How would you evaluate our company's current talent strategy based on your research and experience, and what recommendations would you make to ensure we can attract and retain top talent in our industry?",
        "Our company has a specific position on [sustainability, social responsibility, etc.]. How does this align with your observations of industry trends, and how might we evolve this position to stay ahead of changing expectations?",
        "Based on your analysis of our financial performance and market position, what do you see as our most promising opportunities for growth in the next 3-5 years?",
        "Our company has a specific organizational structure and decision-making process. Based on your experience with different organizational models, what strengths and potential limitations do you see in our approach?",
        "We're interested in your perspective on our brand positioning. How would you characterize our brand's strengths and weaknesses in the current market, and what strategic adjustments might you suggest?",
      ],
    },
    situational: {
      easy: [
        "How do you handle tight deadlines?",
        "What would you do if you made a mistake at work?",
        "How do you handle criticism?",
        "What would you do if you disagreed with a coworker?",
        "How do you handle stress at work?",
        "What would you do if you were assigned a task you've never done before?",
        "How do you prioritize your work?",
        "What would you do if you were falling behind on a project?",
        "How do you handle multiple tasks at once?",
        "What would you do if a client was unhappy with your work?",
        "How do you handle changes to project requirements?",
        "What would you do if you noticed a safety or ethical concern?",
        "How do you approach learning new skills?",
        "What would you do if you received unclear instructions?",
        "How do you handle conflicts in the workplace?",
      ],
      medium: [
        "How would you handle a situation where you're given conflicting priorities by different managers?",
        "What would you do if you noticed a colleague was struggling with their workload?",
        "How would you approach a situation where you need to deliver bad news to a client or stakeholder?",
        "What would you do if you disagreed with a decision made by your manager?",
        "How would you handle a situation where you need to implement a change that faces resistance from your team?",
        "What would you do if you realized halfway through a project that your approach wasn't going to work?",
        "How would you handle a situation where you need to meet a deadline but the quality of work might suffer?",
        "What would you do if you were asked to take on responsibilities outside your job description?",
        "How would you approach a situation where you need to collaborate with a difficult colleague on an important project?",
        "What would you do if you identified a process that could be significantly improved?",
        "How would you handle a situation where you made a mistake that impacted others' work?",
        "What would you do if you were given a project with unrealistic expectations or resources?",
        "How would you approach a situation where you need to give constructive feedback to a peer?",
        "What would you do if you were asked to compromise on quality to meet a deadline?",
        "How would you handle a situation where you need to quickly adapt to a significant change in your role or project?",
      ],
      hard: [
        "You're leading a critical project that's behind schedule and over budget. The executive team is pressuring you for results, your team is showing signs of burnout, and a key team member just resigned. How would you handle this situation and what specific actions would you take to get the project back on track?",
        "You discover that a senior colleague has been manipulating data to make their department's performance look better than it actually is. This person is well-respected and has a close relationship with executive leadership. What specific steps would you take to address this situation?",
        "Your company is implementing a major strategic pivot that will require significant changes to how your team operates. Half of your team is resistant to the change and morale is declining. You also have personal reservations about some aspects of the new direction. How would you lead your team through this transition?",
        "You're managing a diverse team across multiple time zones with conflicting cultural approaches to communication and decision-making. This is causing significant delays and misunderstandings on a high-visibility project. What specific strategies would you implement to improve team cohesion and effectiveness?",
        "You've been tasked with reducing your department's budget by 20% while maintaining current productivity levels. This will likely require eliminating positions or reducing hours for team members who have been loyal to the company. How would you approach this challenge?",
        "You're leading a cross-functional initiative that requires cooperation from several department heads, but you have no direct authority over them. Two key stakeholders are actively resisting participation and undermining the project. How would you navigate this situation?",
        "Your team has developed an innovative solution that could significantly benefit the company, but it would require substantial changes to established processes and would face resistance from other departments. How would you build support for this innovation and navigate organizational politics?",
        "You discover a serious flaw in your company's flagship product that could potentially impact customer safety. Addressing it immediately would cause significant financial impact and negative publicity. Delaying could increase risk to customers. What specific steps would you take?",
        "You're managing a team that has inherited a critical legacy system with poorly documented code and technical debt. You need to both maintain this system and modernize it, but you have limited resources and expertise. How would you approach this challenge?",
        "You're leading a high-profile project when you realize that the original goals are no longer achievable within the constraints given. The project has high visibility with executive leadership and is tied to the company's strategic objectives. How would you handle this situation?",
        "You've been brought in to turn around a team with a history of missed deadlines, poor quality work, and interpersonal conflicts. You discover that the previous manager created a toxic environment and there are deep-seated trust issues. What specific steps would you take in your first 30, 60, and 90 days?",
        "Your company is facing a public relations crisis related to an issue in your department's area of responsibility. The situation is evolving rapidly, information is incomplete, and both internal and external stakeholders are demanding immediate responses. How would you manage this crisis?",
        "You're responsible for implementing a new technology that will significantly change how employees work. You've received feedback that many employees are anxious about their ability to adapt and fear for their job security. How would you address these concerns while ensuring successful implementation?",
        "You're managing a project where a key deliverable from an external vendor is significantly delayed, putting your timeline at risk. The vendor is strategic to your company, and the relationship is managed at an executive level. How would you handle this situation to keep your project on track while preserving the relationship?",
      ],
    },
  },
}

// Function to generate a question based on interview type, specialty, and difficulty
export async function generateQuestion(
  type: string,
  specialty = "",
  difficulty = "medium",
  previousQuestions: string[] = [],
) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  try {
    // Get the appropriate question category
    const categoryQuestions = questionDatabase[type as keyof typeof questionDatabase] || questionDatabase.technical

    // Get the specialty questions or default to the first specialty
    const specialtyKey =
      specialty && categoryQuestions[specialty as keyof typeof categoryQuestions]
        ? specialty
        : Object.keys(categoryQuestions)[0]

    const specialtyQuestions = categoryQuestions[specialtyKey as keyof typeof categoryQuestions]

    // Get questions for the specified difficulty or default to medium
    const difficultyKey =
      difficulty && specialtyQuestions[difficulty as keyof typeof specialtyQuestions] ? difficulty : "medium"

    const questions = specialtyQuestions[difficultyKey as keyof typeof specialtyQuestions]

    // Filter out previously asked questions
    const availableQuestions = questions.filter((q) => !previousQuestions.includes(q))

    // If all questions have been asked, reset and use all questions
    const questionPool = availableQuestions.length > 0 ? availableQuestions : questions

    // Select a random question
    const randomIndex = Math.floor(Math.random() * questionPool.length)
    return questionPool[randomIndex]
  } catch (error) {
    console.error("Error generating question:", error)
    return "Tell me about your background and experience in this field."
  }
}

// Function to generate feedback for an answer
export async function generateFeedback(question: string, answer: string) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800))

  // Analyze answer length and content
  const wordCount = answer.split(/\s+/).length
  let feedbackType = "generic"

  if (wordCount < 30) {
    feedbackType = "too_short"
  } else if (wordCount > 300) {
    feedbackType = "too_long"
  } else if (answer.includes("example") || answer.includes("instance") || answer.includes("situation")) {
    feedbackType = "good_examples"
  } else if (answer.includes("I think") || answer.includes("maybe") || answer.includes("possibly")) {
    feedbackType = "too_uncertain"
  }

  // Feedback templates
  const feedbackTemplates = {
    generic: [
      "Your answer demonstrates good knowledge of the subject. To strengthen your response, consider providing more specific examples from your experience.",
      "You've provided a solid response. To make it even better, try structuring your answer with a clear beginning, middle, and conclusion.",
      "Your answer covers the basics well. To stand out more, consider quantifying your achievements or results when discussing your experience.",
      "You've explained your approach clearly. To enhance your answer, try connecting your experience more directly to the requirements of the role.",
      "Good response overall. To make it more impactful, consider emphasizing the specific skills that make you uniquely qualified for this position.",
    ],
    too_short: [
      "Your answer is concise, but could benefit from more detail. Consider expanding on your points with specific examples from your experience.",
      "While brevity can be a virtue, this answer would be stronger with more supporting details or examples to illustrate your points.",
      "Your response is a good start, but seems incomplete. Try elaborating on your main points to provide a more comprehensive answer.",
      "This answer could benefit from more depth. Consider using the STAR method (Situation, Task, Action, Result) to structure a more detailed response.",
      "Your answer touches on the key points but lacks sufficient detail. Consider providing specific examples to strengthen your response.",
    ],
    too_long: [
      "Your answer is comprehensive, but could be more focused. Try prioritizing the most relevant points to make your response more concise.",
      "You've provided a lot of detail, which shows your knowledge. Consider streamlining your answer to emphasize the most important aspects.",
      "Your thorough response demonstrates your expertise, but in an interview setting, a more concise answer might be more effective. Try focusing on your strongest points.",
      "While your detailed answer shows depth of knowledge, consider using a more structured approach to make your key points stand out more clearly.",
      "Your comprehensive response covers many aspects well. For even greater impact, try prioritizing the 2-3 most relevant points and elaborating on those specifically.",
    ],
    good_examples: [
      "Your use of specific examples strengthens your answer effectively. To make it even better, consider quantifying the impact or results of your actions.",
      "The examples you provided illustrate your experience well. To enhance your answer further, try connecting these examples more explicitly to the requirements of the role.",
      "Your concrete examples make your answer compelling. For even greater impact, consider briefly mentioning what you learned from these experiences.",
      "The specific situations you described demonstrate your capabilities well. To strengthen your answer further, consider highlighting the skills these examples showcase.",
      "Your examples effectively support your points. To make your answer even stronger, consider structuring each example using the STAR method for clarity.",
    ],
    too_uncertain: [
      "Your answer shows thoughtfulness, but could benefit from more confident language. Try replacing phrases like 'I think' with more assertive statements.",
      "While your response shows you've considered the question carefully, using more confident language would strengthen your answer.",
      "Your answer contains good content, but the tentative language might undermine your expertise. Try using more definitive statements to convey confidence.",
      "The content of your answer is solid, but consider using more assertive language to demonstrate your confidence and expertise.",
      "Your response shows good thinking, but could be delivered with more conviction. Try removing qualifying language like 'maybe' or 'possibly' to strengthen your answer.",
    ],
  }

  // Select a random feedback from the appropriate category
  const feedbacks = feedbackTemplates[feedbackType as keyof typeof feedbackTemplates]
  const randomIndex = Math.floor(Math.random() * feedbacks.length)
  return feedbacks[randomIndex]
}

// Function to generate a set of questions for an interview
export async function generateInterviewQuestions(type: string, specialty = "", difficulty = "medium", count = 5) {
  const questions = []
  const previousQuestions = []

  for (let i = 0; i < count; i++) {
    const question = await generateQuestion(type, specialty, difficulty, previousQuestions)
    questions.push(question)
    previousQuestions.push(question)
  }

  return questions
}

// Function to analyze interview performance
export async function analyzePerformance(answers: Array<{ question: string; answer: string; feedback: string }>) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1200))

  // Mock analysis based on answers and feedback
  const scores = {
    overall: Math.floor(Math.random() * 15) + 65, // 65-80 range
    technical: Math.floor(Math.random() * 20) + 70, // 70-90 range
    communication: Math.floor(Math.random() * 20) + 65, // 65-85 range
    confidence: Math.floor(Math.random() * 25) + 60, // 60-85 range
    bodyLanguage: Math.floor(Math.random() * 20) + 65, // 65-85 range
  }

  // Generate strengths based on highest scores
  const strengths = [
    "Clear articulation of complex concepts",
    "Good problem-solving approach explanation",
    "Effective use of specific examples",
    "Structured and organized responses",
    "Positive and enthusiastic demeanor",
  ]

  // Generate improvements based on lowest scores
  const improvements = [
    "Work on maintaining consistent eye contact during responses",
    "Reduce filler words like 'um' and 'you know'",
    "Provide more concrete examples in technical explanations",
    "Structure longer responses with clearer beginning, middle, and end",
    "Practice more concise answers to common questions",
  ]

  return {
    scores,
    strengths: strengths.slice(0, 5),
    improvements: improvements.slice(0, 5),
  }
}
