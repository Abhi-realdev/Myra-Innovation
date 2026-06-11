import { NextResponse } from "next/server";

function getScriptUrl() {
  return process.env.APPS_SCRIPT_URL || process.env.NEXT_PUBLIC_APPS_SCRIPT_URL;
}

function getSpreadsheetId() {
  return process.env.SPREADSHEET_ID || process.env.NEXT_PUBLIC_SPREADSHEET_ID;
}

export async function POST(request: Request) {
  const scriptUrl = getScriptUrl();

  const spreadsheetId = getSpreadsheetId();

  if (!scriptUrl || scriptUrl === "mock-url") {
    return NextResponse.json(
      {
        status: "error",
        message:
          "Google Sheets backend is not configured. Deploy backend/code.js from your Google Sheet and set APPS_SCRIPT_URL in .env.local.",
      },
      { status: 503 }
    );
  }

  if (!spreadsheetId) {
    return NextResponse.json(
      {
        status: "error",
        message:
          "Spreadsheet ID is missing. Add NEXT_PUBLIC_SPREADSHEET_ID to .env.local — copy the ID from your Google Sheet URL (between /d/ and /edit).",
      },
      { status: 503 }
    );
  }

  try {
    const rawBody = await request.text();
    const payload = JSON.parse(rawBody);
    payload.spreadsheetId = spreadsheetId;
    const body = JSON.stringify(payload);

    const response = await fetch(scriptUrl, {
      method: "POST",
      headers: { "Content-Type": "text/plain" },
      body,
    });

    const responseText = await response.text();

    let result: { status?: string; message?: string; registrationId?: string };
    try {
      result = JSON.parse(responseText);
    } catch {
      return NextResponse.json(
        {
          status: "error",
          message:
            "Google Apps Script returned an invalid response. Redeploy the web app from your Google Sheet (Deploy > Manage deployments > New version).",
        },
        { status: 502 }
      );
    }

    if (!response.ok || result.status === "error") {
      return NextResponse.json(result, { status: 502 });
    }

    return NextResponse.json(result);
  } catch {
    return NextResponse.json(
      {
        status: "error",
        message:
          "Could not reach Google Sheets. Confirm your Apps Script URL is correct, deployed as a web app with access set to Anyone.",
      },
      { status: 502 }
    );
  }
}
