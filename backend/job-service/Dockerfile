FROM openjdk:17-slim

WORKDIR /app

COPY . .

RUN ./gradlew clean build -x test

EXPOSE 8080

CMD ["java", "-jar", "build/libs/job-service-0.0.1-SNAPSHOT.jar"] 