/**
 * MYRA Innovation Challenge 2026 - Google Apps Script Backend
 * 
 * Instructions:
 * 1. Open your Google Sheet.
 * 2. Click Extensions > Apps Script.
 * 3. Delete any default code in Code.gs and paste this script.
 * 4. Click Save.
 * 5. Click "Deploy" > "New deployment".
 * 6. Select "Web app" as the type.
 * 7. Set "Execute as" to "Me".
 * 8. Set "Who has access" to "Anyone" (crucial for anonymous API access).
 * 9. Click Deploy, authorize permissions, and copy the Web App URL.
 * 10. Copy your Google Sheet ID from the URL (the long string between /d/ and /edit).
 * 11. Paste both values into your Next.js .env.local:
 *     NEXT_PUBLIC_APPS_SCRIPT_URL="YOUR_WEB_APP_URL"
 *     NEXT_PUBLIC_SPREADSHEET_ID="YOUR_SHEET_ID"
 * 12. After any code change: Deploy > Manage deployments > Edit > New version.
 */

function getSpreadsheet(data) {
  const spreadsheetId =
    (data && data.spreadsheetId) ||
    PropertiesService.getScriptProperties().getProperty("SPREADSHEET_ID");

  if (spreadsheetId) {
    return SpreadsheetApp.openById(spreadsheetId);
  }

  const active = SpreadsheetApp.getActiveSpreadsheet();
  if (!active) {
    throw new Error(
      "No spreadsheet configured. Set NEXT_PUBLIC_SPREADSHEET_ID in .env.local or SPREADSHEET_ID in Apps Script project properties."
    );
  }
  return active;
}

function doGet(e) {
  const action = e && e.parameter ? e.parameter.action : "";

  if (action === "info" || action === "verify") {
    try {
      const spreadsheetId = e.parameter.spreadsheetId || "";
      const ss = getSpreadsheet(spreadsheetId ? { spreadsheetId: spreadsheetId } : null);
      return respondJSON({
        status: "success",
        spreadsheetName: ss.getName(),
        spreadsheetId: ss.getId(),
        spreadsheetUrl: ss.getUrl(),
        message: "Connected to Google Sheet successfully.",
      });
    } catch (error) {
      return respondJSON({ status: "error", message: error.toString() });
    }
  }

  return ContentService.createTextOutput("MYRA Backend Service Active.")
    .setMimeType(ContentService.MimeType.TEXT);
}

function doPost(e) {
  try {
    const rawData = e.postData.contents;
    const data = JSON.parse(rawData);
    
    if (data.action === "register") {
      return handleRegistration(data);
    } else {
      return respondJSON({ status: "error", message: "Unknown action request." });
    }
  } catch (error) {
    return respondJSON({ status: "error", message: error.toString() });
  }
}

function handleRegistration(data) {
  const ss = getSpreadsheet(data);
  const email = data.email.toString().trim().toLowerCase();
  const category = data.category; // 'reel' | 'hackathon' | 'design' | 'blog'
  
  // Map categories to Sheet Names
  let sheetName = "";
  if (category === "reel") sheetName = "Reel Making";
  else if (category === "hackathon") sheetName = "Hackathon";
  else if (category === "design") sheetName = "Creative & Design";
  else if (category === "blog") sheetName = "Blog Writing";
  else return respondJSON({ status: "error", message: "Invalid event category selected." });
  
  // Find or Create Sheet
  let sheet = ss.getSheetByName(sheetName);
  if (!sheet) {
    sheet = ss.insertSheet(sheetName);
    setupHeaders(sheet, category);
  }
  
  // Check for duplicate emails in the active sheet
  const lastRow = sheet.getLastRow();
  if (lastRow > 1) {
    const emailValues = sheet.getRange(2, 4, lastRow - 1, 1).getValues(); // Email is column 4
    for (let i = 0; i < emailValues.length; i++) {
      if (emailValues[i][0].toString().trim().toLowerCase() === email) {
        return respondJSON({ 
          status: "error", 
          message: "You have already registered for this category with this email address." 
        });
      }
    }
  }
  
  // Process File Uploads to Google Drive
  const parentFolder = getOrCreateFolder("MYRA_Innovation_Challenge_2026_Submissions");
  const subFolder = getOrCreateFolder(sheetName + "_Files", parentFolder);
  
  const fileUrls = {
    resume: "",
    portfolio: "",
    support: ""
  };
  
  if (data.files) {
    if (data.files.resume && data.files.resume.base64) {
      fileUrls.resume = uploadToDrive(data.files.resume, data.fullName + "_Resume", subFolder);
    }
    if (data.files.portfolio && data.files.portfolio.base64) {
      fileUrls.portfolio = uploadToDrive(data.files.portfolio, data.fullName + "_Portfolio", subFolder);
    }
    if (data.files.support && data.files.support.base64) {
      fileUrls.support = uploadToDrive(data.files.support, data.fullName + "_SupportDocs", subFolder);
    }
  }
  
  // Generate Unique Registration ID
  const randNum = Math.floor(10000 + Math.random() * 90000);
  const registrationId = "MYRA-2026-" + randNum;
  
  // Append Row based on category fields
  const rowData = [
    new Date(), // Column 1: Timestamp
    registrationId, // Column 2: Reg ID
    data.fullName, // Column 3: Name
    data.email, // Column 4: Email
    data.phone, // Column 5: Phone
    data.whatsapp, // Column 6: WhatsApp
    data.gender, // Column 7: Gender
    data.dob, // Column 8: DOB
    data.organization, // Column 9: Org/School
    data.courseClass, // Column 10: Class/Course
    data.city, // Column 11: City
    data.state, // Column 12: State
    data.country, // Column 13: Country
  ];
  
  // Add category specific details
  if (category === "reel") {
    rowData.push(
      data.eventSpecificData.instagramLink,
      data.eventSpecificData.youtubeLink,
      data.eventSpecificData.editingSoftware,
      data.eventSpecificData.bestReelLink,
      data.eventSpecificData.experience,
      data.eventSpecificData.motivation
    );
  } else if (category === "hackathon") {
    rowData.push(
      data.eventSpecificData.programmingLanguages,
      data.eventSpecificData.githubProfile,
      data.eventSpecificData.linkedinProfile,
      data.eventSpecificData.technicalSkills,
      data.eventSpecificData.projectDescription,
      data.eventSpecificData.problemStatement
    );
  } else if (category === "design") {
    rowData.push(
      data.eventSpecificData.designTools,
      data.eventSpecificData.portfolioLink,
      data.eventSpecificData.bestWorkLink,
      data.eventSpecificData.designDomain,
      data.eventSpecificData.creativeStatement
    );
  } else if (category === "blog") {
    rowData.push(
      data.eventSpecificData.blogLinks,
      data.eventSpecificData.writingPlatform,
      data.eventSpecificData.preferredTopics,
      data.eventSpecificData.writingSample,
      data.eventSpecificData.motivation
    );
  }
  
  // Append File URLs
  rowData.push(fileUrls.resume, fileUrls.portfolio, fileUrls.support);
  
  sheet.appendRow(rowData);
  
  // Send Automated Confirmation Email
  sendConfirmationEmail(data.email, data.fullName, registrationId, sheetName);
  
  return respondJSON({
    status: "success",
    registrationId: registrationId,
    spreadsheetName: ss.getName(),
    spreadsheetUrl: ss.getUrl(),
    sheetTab: sheetName,
    message: "Registration completed successfully."
  });
}

function setupHeaders(sheet, category) {
  const commonHeaders = [
    "Timestamp", "Registration ID", "Full Name", "Email Address", "Phone Number", 
    "WhatsApp Number", "Gender", "Date of Birth", "School/College/Organization", 
    "Course/Class", "City", "State", "Country"
  ];
  
  let specificHeaders = [];
  if (category === "reel") {
    specificHeaders = [
      "Instagram Link", "YouTube Link", "Editing Software", "Best Reel Link", 
      "Experience Level", "Why Participate?"
    ];
  } else if (category === "hackathon") {
    specificHeaders = [
      "Programming Languages", "GitHub Profile", "LinkedIn Profile", 
      "Technical Skills", "Project Description", "Problem Statement"
    ];
  } else if (category === "design") {
    specificHeaders = [
      "Design Tools", "Portfolio Link", "Best Design Link", 
      "Preferred Design Domain", "Creative Statement"
    ];
  } else if (category === "blog") {
    specificHeaders = [
      "Blog Links", "Writing Platform", "Preferred Topics", "Writing Sample", "Why Participate?"
    ];
  }
  
  const fileHeaders = ["Resume URL", "Portfolio URL", "Supporting Docs URL"];
  
  const allHeaders = commonHeaders.concat(specificHeaders).concat(fileHeaders);
  sheet.appendRow(allHeaders);
  
  // Format Header Row
  const headerRange = sheet.getRange(1, 1, 1, allHeaders.length);
  headerRange.setFontWeight("bold");
  headerRange.setBackground("#0a58ca");
  headerRange.setFontColor("#ffffff");
  sheet.setFrozenRows(1);
}

function uploadToDrive(fileObj, baseName, folder) {
  try {
    const fileData = Utilities.base64Decode(fileObj.base64);
    const blob = Utilities.newBlob(fileData, fileObj.type, baseName + "_" + fileObj.name);
    const file = folder.createFile(blob);
    
    // Set view permissions for anyone with link (critical for admin dashboard review)
    file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
    return file.getUrl();
  } catch (err) {
    Logger.log("File upload failed: " + err.toString());
    return "Upload Failed: " + err.toString();
  }
}

function getOrCreateFolder(folderName, parentFolder) {
  let folders;
  if (parentFolder) {
    folders = parentFolder.getFoldersByName(folderName);
  } else {
    folders = DriveApp.getFoldersByName(folderName);
  }
  
  if (folders.hasNext()) {
    return folders.next();
  } else {
    if (parentFolder) {
      return parentFolder.createFolder(folderName);
    } else {
      return DriveApp.createFolder(folderName);
    }
  }
}

function sendConfirmationEmail(recipientEmail, name, regId, categoryName) {
  const subject = "Successfully Registered: MYRA Innovation Challenge 2026";
  
  const htmlBody = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff;">
      <div style="background-color: #0a58ca; padding: 15px; border-radius: 8px 8px 0 0; text-align: center; color: white;">
        <h2 style="margin: 0; font-size: 20px; letter-spacing: 1px;">MYRA GLOBAL TECH</h2>
        <p style="margin: 5px 0 0 0; font-size: 11px; opacity: 0.9;">INNOVATION CHALLENGE 2026</p>
      </div>
      
      <div style="padding: 20px 10px; color: #334155;">
        <p style="font-size: 15px; line-height: 1.5;">Dear <strong>${name}</strong>,</p>
        <p style="font-size: 15px; line-height: 1.5;">Congratulations! Your registration for the national-level <strong>MYRA Innovation Challenge 2026</strong> has been received and verified.</p>
        
        <div style="background-color: #f8fafc; border: 1px dashed #cbd5e1; border-radius: 8px; padding: 15px; margin: 25px 0; text-align: left;">
          <h3 style="margin: 0 0 10px 0; font-size: 14px; text-transform: uppercase; color: #64748b;">Official Registration Details</h3>
          <table style="width: 100%; font-size: 13px;">
            <tr>
              <td style="padding: 4px 0; color: #64748b; width: 120px;">Registration ID:</td>
              <td style="padding: 4px 0; font-family: monospace; font-weight: bold; color: #0a58ca;">${regId}</td>
            </tr>
            <tr>
              <td style="padding: 4px 0; color: #64748b;">Event Category:</td>
              <td style="padding: 4px 0; font-weight: bold;">${categoryName}</td>
            </tr>
            <tr>
              <td style="padding: 4px 0; color: #64748b;">Mode:</td>
              <td style="padding: 4px 0;">Hybrid / Virtual Challenge</td>
            </tr>
            <tr>
              <td style="padding: 4px 0; color: #64748b;">Competition Dates:</td>
              <td style="padding: 4px 0;">Jan 15 - 18, 2026</td>
            </tr>
          </table>
        </div>
        
        <p style="font-size: 14px; line-height: 1.5;"><strong>What happens next?</strong></p>
        <ul style="font-size: 13px; line-height: 1.6; padding-left: 20px; color: #475569;">
          <li>Keep your Registration ID safe for further project submissions and dashboard logins.</li>
          <li>Detailed instructions, problem statements (for Hackathon), and platform submission slots will be emailed to you on <strong>Jan 10, 2026</strong>.</li>
          <li>Follow our social handles to stay updated on event timelines and speaker line-ups.</li>
        </ul>
        
        <p style="font-size: 13px; margin-top: 30px; color: #94a3b8; text-align: center;">This is an automated confirmation message. Do not reply to this email. For any queries, write to support@myraglobaltech.com</p>
      </div>
      
      <div style="border-t: 1px solid #e2e8f0; padding-top: 15px; text-align: center; font-size: 11px; color: #94a3b8;">
        &copy; 2026 MYRA Global Tech. All Rights Reserved.
      </div>
    </div>
  `;
  
  try {
    MailApp.sendEmail({
      to: recipientEmail,
      subject: subject,
      htmlBody: htmlBody
    });
  } catch (err) {
    Logger.log("Email dispatch failed: " + err.toString());
  }
}

function respondJSON(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
