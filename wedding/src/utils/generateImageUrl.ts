// fileName = wedding_01
// format = jpg | webp
// option = c_fill, w_400, h_400, q_auto

export function generateImageUrl({
  filename,
  format,
  option = 'q_auto,c_fill',
}: {
  filename: string
  format: 'jpg' | 'webp'
  option?: string
}) {
  return `https://res.cloudinary.com/dqhhr8oy9/image/upload/${option}/v1732680866/${filename}.${format}`
}
