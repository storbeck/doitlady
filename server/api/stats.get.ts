export default defineEventHandler(async (event) => {
  // make sure the user is logged in
  const { user } = await requireUserSession(event);
  console.log('Fetching stats for user:', user);

  // TODO: Fetch some stats based on the user
  return {};
})
