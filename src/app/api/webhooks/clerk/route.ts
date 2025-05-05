import { deleteUser, insertUser, updateUser } from "@/features/users/db/users";
import { verifyWebhook } from "@clerk/nextjs/webhooks";
import type { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  console.log("Received webhook");
  const event = await verifyWebhook(req);
  const eventType = event.type;
  switch (eventType) {
    case "user.created":
      const email = event.data.email_addresses.find(
        (email) => email.id === event.data.primary_email_address_id
      )?.email_address;
      const name = `${event.data.first_name} ${event.data.last_name}`.trim();
      if (email == null) return new Response("No email", { status: 400 });
      if (name === "") return new Response("No name", { status: 400 });
      await insertUser({
        clerkUserId: event.data.id,
        email,
        name,
      });
      break;
    case "user.updated": {
      const email = event.data.email_addresses.find(
        (email) => email.id === event.data.primary_email_address_id
      )?.email_address;
      const name = `${event.data.first_name} ${event.data.last_name}`.trim();
      if (email == null) return new Response("No email", { status: 400 });
      if (name === "") return new Response("No name", { status: 400 });
      await updateUser(
        { clerkUserId: event.data.id },
        {
          email,
          name,
          role: event.data.public_metadata.role,
        }
      );
      break;
    }
    case "user.deleted": {
      if (event.data.id != null) {
        await deleteUser({ clerkUserId: event.data.id });
      }
      break;
    }
  }

  return new Response("Hello", { status: 200 });
}
