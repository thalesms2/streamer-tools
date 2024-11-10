// import "server-only";

// import { getUser } from "@/lib/dal";
// import prisma from "@/lib/prisma";

// function canSeeUsername(viewer: User) {
//   return true;
// }

// function canSeePhoneNumber(viewer: User, team: string) {
//   return viewer.isAdmin || team === viewer.team;
// }

// export async function getProfileDTO(slug: string) {
//   const user = await prisma.user.findMany({
//     where: {
//       id: slug
//     }
//   });

//   const currentUser = await getUser(user.id);

//   // Or return only what's specific to the query here
//   return {
//     username: canSeeUsername(currentUser) ? user.username : null,
//     phonenumber: canSeePhoneNumber(currentUser, user.team)
//       ? user.phonenumber
//       : null,
//   };
// }
