
const templates = require("./templates");

const loadEmailData = (templateName, data) => {
    let loadedEmailTemplate = Object.assign({}, templates[templateName]);
    let coursesText = prepareCourses(data.courses)
    if(templateName == "quotation"){
        loadedEmailTemplate.to = loadedEmailTemplate.to.replace("#emailTo" , data.to);
        loadedEmailTemplate.subject = loadedEmailTemplate.subject.replace("#courseTitle" , data.courseTitle);
        loadedEmailTemplate.body = loadedEmailTemplate.body.replace("#email" , data.email);
        loadedEmailTemplate.body = loadedEmailTemplate.body.replace("#courses" , coursesText);
        loadedEmailTemplate.body = loadedEmailTemplate.body.replace("#country" , data.country);
        loadedEmailTemplate.body = loadedEmailTemplate.body.replace('#name', data.name)
        loadedEmailTemplate.body = loadedEmailTemplate.body.replace('#phoneNumber',data.phoneNumber)
        loadedEmailTemplate.body = loadedEmailTemplate.body.replace('#company',data.company)
        loadedEmailTemplate.body = loadedEmailTemplate.body.replace('#region',data.region)
        loadedEmailTemplate.body = loadedEmailTemplate.body.replace('#canCall', data.canCall? 'Yes' : 'No')
        loadedEmailTemplate.body = loadedEmailTemplate.body.replace('#additionalInfo', data.additionalInfo? data.additionalInfo : 'NA')
    }
    return loadedEmailTemplate;
};

const prepareCourses = (courses) => {
    let coursesText = "<ul>";
    courses.forEach(course => {
        coursesText += `<li>${course.title} (${course.attendence} Trainees)</li>`
    });
    coursesText += `</ul>`;
    return coursesText;
}

module.exports = { loadEmailData };