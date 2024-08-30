@RestResource(urlMapping='/studentsInfo/*')
global class StudentInformationService {
  global class StudentInfo {
    String studentName { get; set; }
    String studentAddress { get; set; }
    String studentPhone { get; set; }
    String schoolName { get; set; }
  }

  @httpGet
  global static StudentInfo getStudent() {
    RestRequest request = RestContext.Request;
    String studentId = request.requestURI.substring(
      request.RequestURI.lastIndexOf('/') + 1
    );
    student__c student = [
      SELECT
        id,
        Name,
        Address__c,
        // student_name__c,
        Phone_Number__c,
        school__r.Name
      FROM Student__c
      WHERE id = :studentId
    ];
    StudentInfo stdInfo = new StudentInfo();
    // stdInfo.studentName = student.student_name__c;
    stdInfo.studentAddress = student.Address__c;
    stdInfo.studentPhone = student.phone_number__c;
    stdInfo.schoolName = student.school__r.Name;

    return stdInfo;
  }
}
