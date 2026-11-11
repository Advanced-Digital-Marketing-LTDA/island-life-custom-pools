import process from 'node:process';

const commit = process.env.SOURCE_COMMIT || 'local';
if (commit !== 'local' && !/^[a-f0-9]{40}$/.test(commit)) {
  throw new Error('SOURCE_COMMIT must be local or a full lowercase Git SHA');
}

export function GET() {
  return Response.json({ commit });
}
