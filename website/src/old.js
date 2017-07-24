// Returns a string from the org JSON object
function getOrgHTMLfromJSONObject(objOrg) {

  var strReturn = "";

  // Start with the org_name
  strReturn = objOrg.org_name.toString();
  
  // Try to wrap org full name in web IF web.length > 0
  try {
    if (objOrg.web.length > 0) {
      strReturn = "<a href='" + objOrg.web + "'>" + strReturn + "</a>";
    }
  } catch (err) {
  }
  
  // Try to add the org's description IF length > 0
  try {
    if (objOrg.description.length > 0) {
      strReturn += "<br />" + objOrg.description;
    } else {
      strReturn += "";
    }
  } catch (err) {
    strReturn += "";
  }
  
  // Wrap org name in table cell
  strReturn = "<td>" + strReturn + "</td>";
  
  // TODO: Add other org info here
  
  // Add services info
  var strServices = "";
  try {
    if (objOrg.housing == "Y") {
      strServices += "Housing";
    }
    if (objOrg.employment == "Y") {
      if (strServices.length > 0) { strServices += ", "; }
      strServices += "Employment";
    }
    if (objOrg.legal == "Y") {
      if (strServices.length > 0) { strServices += ", "; }
      strServices += "Legal services";
    }
    if (objOrg.education == "Y") {
      if (strServices.length > 0) { strServices += ", "; }
      strServices += "Education";
    }
    if (objOrg.health == "Y") {
      if (strServices.length > 0) { strServices += ", "; }
      strServices += "Health";
    }
    if (objOrg.other == "Y") {
      if (strServices.length > 0) { strServices += ", "; }
      strServices += "Other services";
    }
    strReturn += "<td>" + strServices + "</td>";
  } catch (err) {
    strReturn += "<td></td>";
  }
  
  // Add county info
  try {
    if (objOrg.county.length > 0) {
      strReturn += "<td>" + objOrg.county + "</td>";
    } else {
      strReturn += "<td></td>";
    }
  } catch (err) {
    strReturn += "<td></td>";
  }
  
  // Add contact info
  strReturn += "<td>"; // open contact table cell
  
  // Add Address
  try {
    if (objOrg.address.length > 0) {
      strReturn += objOrg.address + "<br />";
    } else {
      strReturn += "";
    }
  } catch (err) {
    strReturn += "";
  }
  
  // Add Email
  try {
    if (objOrg.email.length > 0) {
      strReturn += "<a href='mailto:" + objOrg.email + "'>" + objOrg.email + "</a>" + "<br />";
    } else {
      strReturn += "";
    }
  } catch (err) {
    strReturn += "";
  }
  
  // Add Phone
  try {
    if (objOrg.phone.length > 0) {
      strReturn += objOrg.phone + "<br />";
    } else {
      strReturn += "";
    }
  } catch (err) {
    strReturn += "";
  }
  
  strReturn += "</td>"; // close contact table cell
   
  // TODO: Add other table columns here
 
  // Add a column to report as closed
  strReturn += "<td>" + "<button type='button'>Report as closed</button>" + "</td>";
  
  // Wrap that in a table row
  strReturn = "<tr>" + strReturn + "</tr>";
  return strReturn ;
  
} // end getOrgHTMLfromJSONObject

function changeText() {
  document.getElementById('pLocalOrgs').innerHTML = 'Loading requested data...';
  
  var request = new XMLHttpRequest();
  request.onreadystatechange = function () {
    var DONE = this.DONE || 4;
    if (this.readyState === DONE){
        // alert(this.readyState);
        // alert(request.responseText);
        var dataObj = JSON.parse(request.responseText);
        var strOrgsList = "<table>";
        // Add a table row of headers
        strOrgsList += "<tr>";
        strOrgsList += "<td><b>Organization</b></td>";
        strOrgsList += "<td><b>Service(s)</b></td>";
        strOrgsList += "<td><b>County</b></td>";
        strOrgsList += "<td><b>Contact info</b></td>";
        strOrgsList += "<td><b>Report</b></td>";
        // TODO: Add other table columns here
        strOrgsList += "</tr>";
        // alert ( typeof dataObj ); 
        // alert (dataObj.toString() )
        // alert (dataObj[1].orgShort.toString() + " test" );
        // alert (dataObj.length);
        // for each object in the dataObj array, parse it:
        for (i = 0; i < dataObj.length; i++ ){
          strOrgsList += getOrgHTMLfromJSONObject(dataObj[i]); 
        }
        strOrgsList += "</table>";
        // alert (strOrgsList); 
        document.getElementById('pLocalOrgs').innerHTML = strOrgsList;
    }
  };
  request.open('GET', 'data.json', true);
  request.setRequestHeader('X-Requested-With', 'XMLHttpRequest');  // Tells server that this call is made for ajax purposes.
  request.send(null);  // No data needs to be sent along with the request.
  document.getElementById('pLocalOrgs').innerHTML = 'Rendering requested data...';
  
}