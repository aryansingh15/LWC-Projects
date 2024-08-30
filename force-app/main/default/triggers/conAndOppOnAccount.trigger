trigger conAndOppOnAccount on Account(after insert) {
  if (Trigger.isAfter && Trigger.isInsert) {
    CreateConAndOppHandler.createConOpp(Trigger.new);
  }

}
