export const runtime = "nodejs";

async function createRunwayClient(apiKey: string) {
  const loadSdk = new Function(
    "specifier",
    "return import(specifier)"
  ) as (specifier: string) => Promise<{
    default: new (options: { apiKey: string }) => {
      tasks: {
        retrieve(taskId: string): Promise<{
          id: string;
          status: string;
          output?: unknown;
          failure?: unknown;
        }>;
      };
    };
  }>;
  const mod = await loadSdk("@runwayml/sdk");

  return new mod.default({ apiKey });
}

export async function GET(req: Request) {
  try {
    const apiKey = process.env.RUNWAYML_API_SECRET;

    if (!apiKey) {
      return Response.json(
        {
          ok: false,
          error: "RUNWAYML_API_SECRET Vercel Environment Variables icinde yok.",
        },
        { status: 500 }
      );
    }

    const { searchParams } = new URL(req.url);
    const taskId = searchParams.get("taskId");

    if (!taskId) {
      return Response.json(
        {
          ok: false,
          error: "taskId gerekli.",
        },
        { status: 400 }
      );
    }

    const runway = await createRunwayClient(apiKey);
    const task = await runway.tasks.retrieve(taskId);

    return Response.json({
      ok: true,
      id: task.id,
      status: task.status,
      output: task.output || null,
      failure: task.failure || null,
    });
  } catch (error) {
    console.error("Runway check-video error:", error);

    const message =
      error instanceof Error ? error.message : "Video durumu kontrol edilemedi.";

    return Response.json(
      {
        ok: false,
        error: message,
      },
      { status: 500 }
    );
  }
}
