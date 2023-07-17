function skillsMember() {
    var member = document.getElementById("member");
    var memberSkill = document.getElementById("memberSkill");
    var memberSkillValue = memberSkill.options[memberSkill.selectedIndex].value;
    var memberSkillText = memberSkill.options[memberSkill.selectedIndex].text;
    var memberSkillList = document.getElementById("memberSkillList");
    var memberSkillListValue = memberSkillList.options[memberSkillList.selectedIndex].value;
    var memberSkillListText = memberSkillList.options[memberSkillList.selectedIndex].text;
    var memberSkillListOption = document.createElement("option");
    var memberSkillListOptionText = document.createTextNode(memberSkillText + " - " + memberSkillListText);
    var memberSkillListOptionValue = memberSkillValue + "-" + memberSkillListValue;
    memberSkillListOption.appendChild(memberSkillListOptionText);
    memberSkillListOption.setAttribute("value", memberSkillListOptionValue);
    memberSkillList.appendChild(memberSkillListOption);
    memberSkillList.selectedIndex = 0;
    memberSkill.selectedIndex = 0;
}