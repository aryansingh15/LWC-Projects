public with sharing class CreateConAndOppHandler {
  public static void createConOpp(List<Account> newList) {
    List<Contact> createCon = new List<Contact>();
    List<Opportunity> createOpp = new List<Opportunity>();

    for (Account accList : newList) {
      if (accList.Create_Contact__c == true) {
        Contact con = new Contact();
        con.AccountId = accList.Id;
        con.LastName = accList.Name;
        createCon.add(con);
      }

      if (accList.Create_Opportunity__c == true) {
        Opportunity opp = new Opportunity();
        opp.AccountId = accList.Id;
        opp.StageName = 'Closed Won';
        opp.CloseDate = Date.today();
        opp.Name = accList.Name + ' Opportunity'; // Assuming Name needs to be set
        createOpp.add(opp);
      }
    }

    if (!createCon.isEmpty()) {
      try {
        insert createCon;
      } catch (DmlException e) {
        // Handle exception, log error, or collect failed records
        System.debug('Failed to insert Contacts: ' + e.getMessage());
      }
    }

    if (!createOpp.isEmpty()) {
      try {
        insert createOpp;
      } catch (DmlException e) {
        // Handle exception, log error, or collect failed records
        System.debug('Failed to insert Opportunities: ' + e.getMessage());
      }
    }
  }
}
