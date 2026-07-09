# Airbnb Backend - Spring Boot API

A robust Spring Boot REST API for the Airbnb Clone application, built with Java 21 and PostgreSQL.

## Overview

This backend service provides REST APIs for managing property listings, including:
- Property listing CRUD operations
- Gallery image management
- Amenities and perks handling
- Listing search and filtering
- Database persistence with Liquibase migrations

## Technology Stack

- **Framework**: Spring Boot 4.1.0
- **Language**: Java 21
- **Database**: PostgreSQL 18.4
- **ORM**: Hibernate/JPA
- **Build Tool**: Maven
- **API Documentation**: Swagger/SpringFox
- **Database Migrations**: Liquibase
- **JSON Processing**: Jackson ObjectMapper
- **CORS**: Enabled for frontend communication

## Project Structure

```
src/
├── main/
│   ├── java/com/cr/main/
│   │   ├── SpringBootTaskApplication.java    # Main application entry point
│   │   ├── config/
│   │   │   ├── CorsConfig.java              # CORS configuration
│   │   │   ├── JacksonConfig.java           # Jackson ObjectMapper configuration
│   │   │   ├── PropertyListingSeedConfig.java # Database seed data
│   │   │   └── SwaggerConfig.java           # API documentation
│   │   ├── controller/
│   │   │   ├── HealthController.java        # Health check endpoint
│   │   │   └── PropertyListingController.java # Property listing endpoints
│   │   ├── dto/                             # Data Transfer Objects
│   │   │   ├── PropertyListingContentDto.java
│   │   │   ├── PropertyListingRequestDto.java
│   │   │   ├── PropertyListingResponseDto.java
│   │   │   ├── GalleryImageDto.java
│   │   │   ├── PerkDto.java
│   │   │   ├── SleepCardDto.java
│   │   │   ├── AmenityDto.java
│   │   │   └── AmenityCategoryDto.java
│   │   ├── entity/
│   │   │   └── PropertyListingEntity.java    # JPA entity for property listings
│   │   ├── repository/
│   │   │   └── PropertyListingRepository.java # Data access layer
│   │   ├── service/
│   │   │   └── PropertyListingService.java   # Business logic
│   │   ├── mapper/                           # Entity-DTO mappers
│   │   ├── exception/                        # Custom exceptions
│   │   ├── payload/                          # Response payloads
│   │   └── validation/                       # Custom validators
│   └── resources/
│       ├── application.yml                   # Application configuration
│       └── db/changelog/                     # Liquibase migration files
└── test/
    └── java/                                 # Unit and integration tests
```

## Prerequisites

- Java 21 or higher
- PostgreSQL 18.4
- Maven 3.8.9 or higher
- Node.js (for frontend development only)

## Setup Instructions

### 1. Database Setup

```bash
# Create PostgreSQL database
psql -U postgres
CREATE DATABASE "AirbnbDB";
```

### 2. Environment Configuration

Create or update `src/main/resources/application.yml`:

```yaml
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/testdb
    username: ********
    password: ********
    driver-class-name: org.postgresql.Driver
  jpa:
    hibernate:
      ddl-auto: update
    properties:
      hibernate:
        dialect: org.hibernate.dialect.PostgreSQLDialect
  liquibase:
    enabled: true
    change-log: classpath:db/changelog/db.changelog-master.yaml
server:
  port: 8080
```

### 3. Build the Application

```bash
# Using Maven wrapper (Windows)
./mvnw.cmd clean compile

# Using Maven wrapper (Linux/Mac)
./mvnw clean compile
```

### 4. Run the Application

```bash
# Development mode (with hot reload)
./mvnw.cmd clean compile spring-boot:run

# Production build
./mvnw.cmd clean package
```

The API will be available at `http://localhost:8080`

## API Endpoints

### Health Check
- `GET /api/health` - Check API health status

### Property Listings
- `GET /api/listings` - Get all property listings
- `GET /api/listings/{slug}` - Get specific listing by slug
- `POST /api/listings` - Create new property listing

## API Documentation

Swagger UI documentation is available at:
```
http://localhost:8080/swagger-ui.html
```

## Key Configuration Files

### JacksonConfig.java
Configures JSON serialization/deserialization:
- Enables `FAIL_ON_UNKNOWN_PROPERTIES = false` for flexible JSON handling
- Registers custom serializers/deserializers if needed

### CorsConfig.java
Enables CORS for cross-origin requests from frontend (localhost:5173)

### PropertyListingSeedConfig.java
Automatically seeds the database with default property listing data on startup

## Database Schema

### property_listing table
```sql
CREATE TABLE property_listing (
    id BIGSERIAL PRIMARY KEY,
    uuid UUID UNIQUE,
    slug VARCHAR(255) UNIQUE,
    title VARCHAR(255),
    content_json TEXT,
    create_at TIMESTAMP,
    update_at TIMESTAMP,
    is_delete BOOLEAN DEFAULT false
);
```

## Common Issues & Solutions

### Issue: "Failed to deserialize listing content"
**Solution**: Ensure all DTOs have `@NoArgsConstructor` annotation for Jackson reflection

### Issue: CORS errors from frontend
**Solution**: Check `CorsConfig.java` allows requests from frontend origin (http://localhost:5173)

### Issue: Database connection fails
**Solution**: Verify PostgreSQL is running and credentials in `application.yml` are correct

## Development Guidelines

1. **DTOs**: All data transfer objects must include:
   - `@NoArgsConstructor` (required by Jackson)
   - `@Data` (from Lombok for getters/setters)
   - `@Builder` (optional, for convenience)

2. **Entities**: JPA entities should:
   - Use `@Entity` annotation
   - Have `@Id` and `@GeneratedValue` for primary key
   - Use `@Column` for field mapping

3. **Repository Methods**: 
   - Follow Spring Data naming conventions
   - Include soft delete support with `isDelete` flag

4. **Error Handling**: Use custom exception classes and global exception handlers

## Testing

Run tests with:
```bash
./mvnw.cmd test
```

## Building for Production

```bash
./mvnw.cmd clean package -DskipTests

# Run the JAR
java -jar target/Airbnb_Backend-0.0.1-SNAPSHOT.jar
```

## Troubleshooting

### Port 8080 already in use
```bash
# Find process using port 8080
netstat -ano | findstr :8080

# Kill the process (Windows)
taskkill /PID <PID> /F
```

### Clear Maven cache
```bash
./mvnw.cmd clean
```

### Rebuild with debug logging
```bash
./mvnw.cmd -X clean compile spring-boot:run
```

## Environment Variables

You can override properties with environment variables:
```bash
export DB_URL=jdbc:postgresql://localhost:5432/AirbnbDB
export DB_USER=postgres
export DB_PASSWORD=Chauhan
```

## License

MIT License - See LICENSE file for details

## Contributing

1. Create a feature branch
2. Make your changes
3. Ensure all tests pass
4. Submit a pull request

## Contact & Support

For issues or questions, please open a GitHub issue or contact the development team.
