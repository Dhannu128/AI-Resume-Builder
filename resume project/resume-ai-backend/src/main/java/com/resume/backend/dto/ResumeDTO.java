package com.resume.backend.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import java.util.List;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class ResumeDTO {
    private PersonalInformation personalInformation;
    private String summary;
    private List<Skill> skills;
    private List<Experience> experience;
    private List<Education> education;
    private List<Certification> certifications;
    private List<Project> projects;
    private List<Achievement> achievements;
    private List<Language> languages;
    private List<Interest> interests;

    public PersonalInformation getPersonalInformation() { return personalInformation; }
    public void setPersonalInformation(PersonalInformation personalInformation) { this.personalInformation = personalInformation; }
    public String getSummary() { return summary; }
    public void setSummary(String summary) { this.summary = summary; }
    public List<Skill> getSkills() { return skills; }
    public void setSkills(List<Skill> skills) { this.skills = skills; }
    public List<Experience> getExperience() { return experience; }
    public void setExperience(List<Experience> experience) { this.experience = experience; }
    public List<Education> getEducation() { return education; }
    public void setEducation(List<Education> education) { this.education = education; }
    public List<Certification> getCertifications() { return certifications; }
    public void setCertifications(List<Certification> certifications) { this.certifications = certifications; }
    public List<Project> getProjects() { return projects; }
    public void setProjects(List<Project> projects) { this.projects = projects; }
    public List<Achievement> getAchievements() { return achievements; }
    public void setAchievements(List<Achievement> achievements) { this.achievements = achievements; }
    public List<Language> getLanguages() { return languages; }
    public void setLanguages(List<Language> languages) { this.languages = languages; }
    public List<Interest> getInterests() { return interests; }
    public void setInterests(List<Interest> interests) { this.interests = interests; }

    public static class PersonalInformation {
        private String fullName;
        private String email;
        private String phoneNumber;
        private String location;
        private String linkedIn;
        private String gitHub;
        private String portfolio;

        public String getFullName() { return fullName; }
        public void setFullName(String fullName) { this.fullName = fullName; }
        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }
        public String getPhoneNumber() { return phoneNumber; }
        public void setPhoneNumber(String phoneNumber) { this.phoneNumber = phoneNumber; }
        public String getLocation() { return location; }
        public void setLocation(String location) { this.location = location; }
        public String getLinkedIn() { return linkedIn; }
        public void setLinkedIn(String linkedIn) { this.linkedIn = linkedIn; }
        public String getGitHub() { return gitHub; }
        public void setGitHub(String gitHub) { this.gitHub = gitHub; }
        public String getPortfolio() { return portfolio; }
        public void setPortfolio(String portfolio) { this.portfolio = portfolio; }
    }

    public static class Skill {
        private String title;
        private String level;

        public Skill() {}
        public Skill(String title, String level) { this.title = title; this.level = level; }
        public String getTitle() { return title; }
        public void setTitle(String title) { this.title = title; }
        public String getLevel() { return level; }
        public void setLevel(String level) { this.level = level; }
    }

    public static class Experience {
        private String jobTitle;
        private String company;
        private String location;
        private String duration;
        private String responsibility;

        public Experience() {}
        public Experience(String jobTitle, String company, String location, String duration) {
            this.jobTitle = jobTitle; this.company = company; this.location = location; this.duration = duration;
        }
        public String getJobTitle() { return jobTitle; }
        public void setJobTitle(String jobTitle) { this.jobTitle = jobTitle; }
        public String getCompany() { return company; }
        public void setCompany(String company) { this.company = company; }
        public String getLocation() { return location; }
        public void setLocation(String location) { this.location = location; }
        public String getDuration() { return duration; }
        public void setDuration(String duration) { this.duration = duration; }
        public String getResponsibility() { return responsibility; }
        public void setResponsibility(String responsibility) { this.responsibility = responsibility; }
    }

    public static class Education {
        private String degree;
        private String university;
        private String location;
        private String graduationYear;

        public Education() {}
        public Education(String degree, String university, String location, String graduationYear) {
            this.degree = degree; this.university = university; this.location = location; this.graduationYear = graduationYear;
        }
        public String getDegree() { return degree; }
        public void setDegree(String degree) { this.degree = degree; }
        public String getUniversity() { return university; }
        public void setUniversity(String university) { this.university = university; }
        public String getLocation() { return location; }
        public void setLocation(String location) { this.location = location; }
        public String getGraduationYear() { return graduationYear; }
        public void setGraduationYear(String graduationYear) { this.graduationYear = graduationYear; }
    }

    public static class Certification {
        private String title;
        private String issuingOrganization;
        private String year;

        public Certification() {}
        public Certification(String title, String issuingOrganization, String year) {
            this.title = title; this.issuingOrganization = issuingOrganization; this.year = year;
        }
        public String getTitle() { return title; }
        public void setTitle(String title) { this.title = title; }
        public String getIssuingOrganization() { return issuingOrganization; }
        public void setIssuingOrganization(String issuingOrganization) { this.issuingOrganization = issuingOrganization; }
        public String getYear() { return year; }
        public void setYear(String year) { this.year = year; }
    }

    public static class Project {
        private String title;
        private String description;
        private List<String> technologiesUsed;
        private String githubLink;

        public Project() {}
        public Project(String title, String description, List<String> technologiesUsed, String githubLink) {
            this.title = title; this.description = description; this.technologiesUsed = technologiesUsed; this.githubLink = githubLink;
        }
        public String getTitle() { return title; }
        public void setTitle(String title) { this.title = title; }
        public String getDescription() { return description; }
        public void setDescription(String description) { this.description = description; }
        public List<String> getTechnologiesUsed() { return technologiesUsed; }
        public void setTechnologiesUsed(List<String> technologiesUsed) { this.technologiesUsed = technologiesUsed; }
        public String getGithubLink() { return githubLink; }
        public void setGithubLink(String githubLink) { this.githubLink = githubLink; }
    }

    public static class Achievement {
        private String title;
        private String year;
        private String extraInformation;

        public String getTitle() { return title; }
        public void setTitle(String title) { this.title = title; }
        public String getYear() { return year; }
        public void setYear(String year) { this.year = year; }
        public String getExtraInformation() { return extraInformation; }
        public void setExtraInformation(String extraInformation) { this.extraInformation = extraInformation; }
    }

    public static class Language {
        private String name;
        public String getName() { return name; }
        public void setName(String name) { this.name = name; }
    }

    public static class Interest {
        private String name;
        public String getName() { return name; }
        public void setName(String name) { this.name = name; }
    }
}

