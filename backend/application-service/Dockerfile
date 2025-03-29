FROM eclipse-temurin:17-jdk-alpine

WORKDIR /app

COPY . .

RUN ./gradlew clean build -x test

EXPOSE 8081

CMD ["java", "-jar", "build/libs/application-service-0.0.1-SNAPSHOT.jar"] 