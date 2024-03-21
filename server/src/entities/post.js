export default function post({
  title,
  context,
  name,
  tags,
  createdAt,
  userId,
  selectedFile,
}) {
  return {
    Title: title,
    Description: context,
    CreatedAt: createdAt,
    Name: name,
    Tags: tags,
    Creator: userId,
    SelectedFile: selectedFile,
  };
}
