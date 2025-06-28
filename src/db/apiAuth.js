import supabase, { supabaseUrl } from "./supabase";

export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function signup({ name, email, password, profilepic }) {
  // First create the user
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
      },
    },
  });

  if (error) throw new Error(error.message);

  // Then upload the profile picture if provided
  if (profilepic) {
    try {
      const fileName = `dp-${data.user.id}-${Math.random()}`;
      
      const { error: storageError } = await supabase.storage
        .from("profilepic")
        .upload(fileName, profilepic, {
          upsert: true,
          cacheControl: '3600'
        });

      if (storageError) throw storageError;

      // Update the user metadata with the profile picture URL
      const { error: updateError } = await supabase.auth.updateUser({
        data: {
          profilepic: `${supabaseUrl}/storage/v1/object/public/profilepic/${fileName}`,
        },
      });

      if (updateError) throw updateError;
    } catch (uploadError) {
      console.error("Error uploading profile picture:", uploadError);
      // We don't throw here to allow signup to complete even if profile pic upload fails
    }
  }

  return data;
}

export async function getCurrentUser() {
  try {
    const { data: session, error: sessionError } = await supabase.auth.getSession();

    if (sessionError) {
      console.error("Session error:", sessionError);
      throw new Error(sessionError.message);
    }

    if (!session?.session) {
      console.log("No active session");
      return null;
    }

    return {
      ...session.session.user,
      role: "authenticated",
    };
  } catch (error) {
    console.error("getCurrentUser error:", error);
    throw error;
  }
}

export async function logout() {
  const {error} = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}
