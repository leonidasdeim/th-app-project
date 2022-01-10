FROM openjdk:17-ea-jdk-oracle
ARG JAR_FILE=build/libs/*.jar 
COPY ${JAR_FILE} application.jar 
ENTRYPOINT ["java", "-jar", "application.jar"]