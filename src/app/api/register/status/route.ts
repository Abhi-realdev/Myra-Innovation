import { NextResponse } from "next/server";

function getScriptUrl() {
  return process.env.APPS_SCRIPT_URL || process.env.NEXT_PUBLIC_APPS_SCRIPT_URL;
}

function getSpreadsheetId() {
  return process.env.SPREADSHEET_ID || process.env.NEXT_PUBLIC_SPREADSHEET_ID;
}

export async function GET() {
  const scriptUrl = getScriptUrl();
  const spreadsheetId = getSpreadsheetId();

  if (!scriptUrl || scriptUrl === "mock-url") {
    return NextResponse.json(
      {
        status: "error",
        message: "Apps Script URL is not configured in .env.local",
      },
      { status: 503 }
    );
  }

  if (!spreadsheetId) {
    return NextResponse.json(
      {
        status: "error",
        message:
          "Spreadsheet ID is missing. Add NEXT_PUBLIC_SPREADSHEET_ID to .env.local (copy it from your Google Sheet URL).",
      },
      { status: 503 }
    );
  }

  try {
    const verifyUrl = `${scriptUrl}?action=verify&spreadsheetId=${encodeURIComponent(spreadsheetId)}`;
    const response = await fetch(verifyUrl, { method: "GET" });
    const responseText = await response.text();

    let result: {
      status?: string;
      message?: string;
      spreadsheetName?: string;
      spreadsheetId?: string;
      spreadsheetUrl?: string;
    };

    try {
      result = JSON.parse(responseText);
    } catch {
      return NextResponse.json(
        {
          status: "error",
          message:
            "Apps Script returned an invalid response. Redeploy backend/code.js from your Google Sheet as a new version.",
        },
        { status: 502 }
      );
    }

    if (!response.ok || result.status === "error") {
      return NextResponse.json(result, { status: 502 });
    }

    return NextResponse.json({
      ...result,
      configuredSpreadsheetId: spreadsheetId,
    });
  } catch {
    return NextResponse.json(
      {
        status: "error",
        message: "Could not reach Google Apps Script. Check your deployment URL and access settings.",
      },
      { status: 502 }
    );
  }
}
