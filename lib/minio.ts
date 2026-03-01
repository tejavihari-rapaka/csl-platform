import * as Minio from 'minio';

/**
 * MinIO client for object storage (images, uploads).
 * S3-compatible - works with MinIO, AWS S3, or compatible services.
 * MINIO_ENDPOINT: e.g. http://localhost:9000
 */
function createMinioClient(): Minio.Client | null {
  const endpoint = process.env.MINIO_ENDPOINT;
  const accessKey = process.env.MINIO_ACCESS_KEY;
  const secretKey = process.env.MINIO_SECRET_KEY;
  if (!endpoint || !accessKey || !secretKey) return null;

  const url = new URL(endpoint);
  const useSSL = url.protocol === 'https:';
  const port = url.port ? parseInt(url.port, 10) : useSSL ? 443 : 9000;

  return new Minio.Client({
    endPoint: url.hostname,
    port,
    useSSL,
    accessKey,
    secretKey,
  });
}

export const minio = createMinioClient();
