# AI Assistant Used

This project was developed with the assistance of GitHub Copilot and ChatGPT.

AI was used to help with:

* React component generation
* Spring Boot boilerplate
* UI refinement
* Debugging
* Code explanations
* Refactoring

All implementation decisions, testing, integration, and final verification were completed manually.


# AI Assistants Used in Development

This document outlines the AI tools and prompting strategies used during the development of the Airbnb Clone application.

## AI Tools & Assistants

### 1. **GitHub Copilot**
- **Primary Role**: Code generation, completion, and real-time development assistance
- **Usage Areas**:
  - React component scaffolding
  - Spring Boot boilerplate generation
  - DTO and entity class creation
  - API endpoint implementation
  - Configuration file setup
  - Code refactoring suggestions

### 2. **ChatGPT**
- **Primary Role**: Problem-solving, architecture guidance, and debugging
- **Usage Areas**:
  - Debugging complex issues (e.g., Jackson deserialization errors)
  - Architecture and design pattern recommendations
  - Code explanations and documentation
  - Error message interpretation and solutions
  - Performance optimization suggestions
  - SQL and database design consultation

## Development Workflow & Prompting Strategy

### Phase 1: Project Setup & Architecture

**Prompt Type**: Structured requirement gathering prompts
```
"I'm building an Airbnb clone with:
- Backend: Spring Boot 4.1.0, Java 21
- Frontend: React with Vite
- Database: PostgreSQL
- Features: Property listings, gallery, amenities, reviews

Help me:
1. Set up the project structure
2. Create DTOs for property listings
3. Configure CORS and Jackson"
```

**Result**: Generated entire project scaffold with configurations

### Phase 2: Backend Development

**Prompt Types**:

#### 2.1 Component Generation
```
"Create a Spring Boot REST controller for property listings with:
- GET /api/listings (return all)
- GET /api/listings/{slug} (return by slug)
- POST /api/listings (create new)
Include proper error handling and validation"
```

#### 2.2 Configuration & Setup
```
"I need Jackson to handle JSON serialization/deserialization.
Configure it to:
- Ignore unknown properties
- Use no-arg constructors for DTOs
- Handle nested objects"
```

**Result**: Generated JacksonConfig.java with proper ObjectMapper setup

#### 2.3 Database & ORM
```
"Create JPA entity for property listings with:
- Soft delete support (is_delete flag)
- JSON content column for nested data
- Proper timestamps
- Repository with custom query methods"
```

**Result**: PropertyListingEntity.java and PropertyListingRepository.java with methods like `findBySlugAndIsDeleteFalse()`

### Phase 3: Frontend Development

**Prompt Types**:

#### 3.1 Component Architecture
```
"Create a React component to display Airbnb property listing with:
- Image gallery (carousel)
- Property details
- Amenities by category
- Availability calendar
- Guest reviews
- Host information
Include responsive design"
```

**Result**: PropertyListing.jsx with all sections structured

#### 3.2 API Integration
```
"Create a service file for API calls:
- Fetch property listings from /api/listings
- Handle errors gracefully
- Return default listing as first item
- Configure Vite proxy for development"
```

**Result**: listingApi.js service layer

#### 3.3 Component Refinement
```
"I have duplicate key warnings in the calendar component.
Help me add unique identifiers combining:
- Calendar date
- Day type indicator

Example: 'October 2026-Tuesday' becomes 'oct-2026-tue-1'"
```

### Phase 4: Debugging & Problem Solving

**Prompt Types**:

#### 4.1 Error Investigation
```
"I'm getting error: 'Failed to deserialize listing content'
The response is JSON from the database:
[error details]

What's wrong and how to fix?"
```

**Result**: Identified missing @NoArgsConstructor on DTOs; added to all 8 DTO classes

#### 4.2 Configuration Issues
```
"Frontend calls /api/listings but gets 404.
Backend has /api/listings endpoint on port 8080.
Frontend on port 5173.

How to configure CORS and Vite proxy?"
```

**Result**: CorsConfig.java and vite.config.js proxy setup

#### 4.3 Data Pipeline Issues
```
"Old database data can't deserialize with new DTOs.
Need to:
1. Delete old data
2. Seed fresh data compatible with DTOs
3. Prevent transaction errors

Show me the proper @Transactional setup"
```

**Result**: PropertyListingSeedConfig.java with proper transaction management

## Key Prompting Strategies Used

### 1. **Specification Prompts**
Clearly state requirements before code generation:
- Technology stack
- Feature list
- Expected behavior
- Error handling requirements

### 2. **Error Context Prompts**
Provide complete error information:
- Full stack trace
- Code snippet showing the issue
- What was expected vs. what happened
- Recent changes made

### 3. **Refinement Prompts**
Follow up with specific adjustments:
- "Add X feature to the existing code"
- "Explain why this error occurs"
- "What's the best practice for Y?"

### 4. **Explanation Prompts**
Ask for understanding of generated code:
- "Explain what this @Annotation does"
- "Why do we need @NoArgsConstructor?"
- "How does Jackson deserialize this JSON?"

### 5. **Comparative Prompts**
Evaluate different approaches:
- "Compare DELETE vs soft delete for this scenario"
- "What's better: @Transactional on method or service?"
- "Should this be in DTO or entity?"

## Implementation Areas

### Backend (Spring Boot)

| Component | AI Tool | Approach |
|-----------|---------|----------|
| Project Structure | Copilot | Generated from template |
| Controllers | Copilot | REST endpoint scaffolding |
| DTOs | Copilot | Object generation with annotations |
| Entities | Copilot | JPA mapping generation |
| Repositories | Copilot | Spring Data interface creation |
| Services | Copilot | Business logic implementation |
| Configuration | ChatGPT | Debugging + Copilot + implementation |
| Database Migrations | Copilot | Liquibase YAML generation |

### Frontend (React + Vite)

| Component | AI Tool | Approach |
|-----------|---------|----------|
| Project Setup | Copilot | Vite template extension |
| Components | Copilot | JSX component generation |
| Styling | Copilot | CSS component creation |
| API Service | Copilot | Fetch wrapper implementation |
| Proxy Config | ChatGPT | Configuration debugging |
| Error Handling | ChatGPT | User-friendly error display |

### Shared (Architecture)

| Area | AI Tool | Approach |
|------|---------|----------|
| Project Structure | ChatGPT | Architecture discussion |
| Data Models | Copilot | DTO/Entity generation |
| API Contract | ChatGPT | REST endpoint design |
| Error Handling | ChatGPT | Exception strategy |
| Database Design | ChatGPT | Schema discussion + Copilot implementation |

## AI-Assisted Problem Solving Examples

### Problem 1: Jackson Deserialization Failure
**Error**: "Failed to deserialize listing content"
**AI Process**: 
1. Asked for error stack trace interpretation
2. Identified missing @NoArgsConstructor
3. Applied to all 8 DTOs
4. Verified solution worked

### Problem 2: 404 API Not Found
**Error**: "GET http://localhost:5173/api/listings/default-listing 404"
**AI Process**:
1. Explained API endpoint mismatch
2. Clarified backend only has /api/listings
3. Updated frontend service to use correct endpoint
4. Recommended Vite proxy setup

### Problem 3: Transaction Management
**Error**: "No EntityManager with actual transaction available"
**AI Process**:
1. Identified @Transactional was needed
2. Explained CommandLineRunner doesn't auto-wrap transactions
3. Alternative: Use service method with @Transactional
4. Recommended: Check if data needs seeding at all

## Testing & Validation Assistance

**AI Role in Testing**:
- Suggested test cases for critical paths
- Helped interpret test failures
- Recommended testing frameworks (JUnit, Jest, Playwright)
- Provided sample test code structure

## Documentation & Code Comments

**AI Generated**:
- README files with comprehensive setup instructions
- Code comments explaining complex logic
- API documentation structure
- Configuration file comments

## Human Decisions

While AI assisted significantly, **all final decisions** were made by the development team:

✅ **Decisions Made by Developers**:
- Architecture and design patterns
- Framework and technology choices
- Database schema design
- API endpoint design
- Component structure
- Error handling strategy
- Testing approach
- Deployment strategy
- Code review and quality standards
- Refactoring decisions
- Integration between frontend and backend

✅ **Implementation & Verification**:
- All code was manually reviewed before use
- Integration testing was manual
- Edge cases were manually tested
- Performance was manually verified
- Final deployment was manual

## Benefits of AI-Assisted Development

1. **Faster Development Cycle**: Reduced time spent on boilerplate code
2. **Better Code Quality**: AI suggested best practices and patterns
3. **Problem Solving**: Quick debugging of complex issues
4. **Learning**: Code generation helped understand new frameworks
5. **Consistency**: AI maintained consistent code style across project
6. **Documentation**: Better, more comprehensive documentation

## Limitations & Manual Interventions

1. **Code Generation Accuracy**: AI sometimes generated incomplete solutions requiring manual refinement
2. **Context Understanding**: Complex business logic required manual implementation
3. **Database Transactions**: Needed manual debugging to fix @Transactional issues
4. **Integration Testing**: Had to manually verify frontend-backend integration
5. **Performance Optimization**: Manual tuning needed after AI suggestions

## Best Practices for AI-Assisted Development

1. **Always Verify Generated Code**: Review before committing
2. **Maintain Human Oversight**: Make final architectural decisions
3. **Use AI for Scaffolding**: Let AI generate boilerplate, manual refine
4. **Clear Specifications**: More specific prompts = better results
5. **Error Context**: Provide full error messages for debugging help
6. **Iterative Refinement**: Use multiple prompt iterations for complex features

## Conclusion

This project demonstrates effective use of AI assistants as development tools:
- **GitHub Copilot** excelled at code generation and completion
- **ChatGPT** provided valuable debugging and architectural guidance
- **Human judgment** maintained project quality and direction
- **Combination approach** resulted in faster, better development

The AI assistants were **tools** that enhanced productivity while maintaining human oversight of all critical decisions.

---

## Prompt Examples Used in This Project

### Example 1: Backend Setup Prompt
```
I need to set up a Spring Boot REST API for property listings.

Tech stack:
- Spring Boot 4.1.0, Java 21
- PostgreSQL database
- Liquibase migrations
- Swagger documentation

Create:
1. application.yml with database config
2. PropertyListingEntity with JSON content
3. PropertyListingRepository
4. PropertyListingService
5. PropertyListingController with GET/POST endpoints

Include proper error handling and CORS support.
```

### Example 2: Frontend Component Prompt
```
Create a React component called PropertyListing that displays:
1. Image gallery at top
2. Property title and rating
3. Amenities grouped by category
4. Availability calendar
5. Guest reviews section
6. Host information
7. Things to know

Make it responsive for mobile and desktop.
Use functional components with React hooks.
```

### Example 3: Debugging Prompt
```
I have this error when starting the backend:
[full error stack trace]

The code that causes it:
[relevant code snippet]

What's the root cause and how to fix it?
Also, explain why this error occurs in Spring Data JPA.
```

---


