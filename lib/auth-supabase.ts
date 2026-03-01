// 'use client';

// import { supabase } from './supabase';
// import { User } from '@/types';

// export async function signUpWithEmail(
//   email: string,
//   password: string,
//   name: string
// ): Promise<User> {
//   try {
//     // Check if supabase client exists
//     if (!supabase) {
//       throw new Error('Supabase client not initialized. Check your environment variables.');
//     }

//     // Sign up with Supabase Auth
//     const { data: authData, error: authError } = await supabase.auth.signUp({
//       email,
//       password,
//       options: {
//         data: {
//           name: name,
//         },
//       },
//     });

//     if (authError) throw authError;
//     if (!authData.user) throw new Error('Failed to create user');

//     // Create user profile in database
//     const user: User = {
//       id: authData.user.id,
//       email: authData.user.email!,
//       name: name,
//       createdAt: new Date(),
//     };

//     const { error: dbError } = await supabase
//       .from('users')
//       .insert({
//         id: user.id,
//         email: user.email,
//         name: user.name,
//         created_at: user.createdAt.toISOString(),
//       });

//     if (dbError) {
//       console.error('Error creating user profile:', dbError);
//       // Continue anyway since auth was successful
//     }

//     return user;
//   } catch (error: any) {
//     console.error('Signup error:', error);
//     throw new Error(error.message || 'Failed to sign up');
//   }
// }

// // export async function signInWithEmail(
// //   email: string,
// //   password: string
// // ): Promise<User> {
// //   try {
// //     if (!supabase) {
// //       throw new Error('Supabase client not initialized. Check your environment variables.');
// //     }

// //     const { data, error } = await supabase.auth.signInWithPassword({
// //       email,
// //       password,
// //     });

// //     if (error) throw error;
// //     if (!data.user) throw new Error('Failed to sign in');

// //     // Get user profile from database
// //     const { data: profile, error: profileError } = await supabase
// //       .from('users')
// //       .select('*')
// //       .eq('id', data.user.id)
// //       .single();

// //     const user: User = {
// //       id: data.user.id,
// //       email: data.user.email!,
// //       name: profile?.name || data.user.user_metadata?.name || 'User',
// //       createdAt: new Date(profile?.created_at || data.user.created_at),
// //     };

// //     return user;
// //   } catch (error: any) {
// //     console.error('Sign in error:', error);
// //     throw new Error(error.message || 'Failed to sign in');
// //   }
// // }



// export async function signInWithEmail(
//   email: string,
//   password: string
// ): Promise<User> {
//   try {
//     if (!supabase) {
//       throw new Error('Supabase client not initialized. Check your environment variables.');
//     }

//     const { data, error } = await supabase.auth.signInWithPassword({
//       email,
//       password,
//     });

//     if (error) throw error;
//     if (!data.user) throw new Error('Failed to sign in');

//     // Get user profile
//     const { data: profile } = await supabase
//       .from('users')
//       .select('*')
//       .eq('id', data.user.id)
//       .single();

//     const user: User = {
//       id: data.user.id,
//       email: data.user.email!,
//       name: profile?.name || data.user.user_metadata?.name || 'User',
//       createdAt: new Date(profile?.created_at || data.user.created_at),
//     };

//     // ✅ SAVE USER IN LOCAL STORAGE
//     if (typeof window !== 'undefined') {
//       localStorage.setItem('currentUser', JSON.stringify(user));
//     }

//     return user;
//   } catch (error: any) {
//     console.error('Sign in error:', error);
//     throw new Error(error.message || 'Failed to sign in');
//   }
// }


// export async function logOut(): Promise<void> {
//   try {
//     if (!supabase) {
//       throw new Error('Supabase client not initialized');
//     }

//     const { error } = await supabase.auth.signOut();
//     if (error) throw error;
//   } catch (error: any) {
//     console.error('Sign out error:', error);
//     throw new Error(error.message || 'Failed to log out');
//   }
// }

// export async function getCurrentUser(): Promise<User | null> {
//   try {
//     if (!supabase) {
//       return null;
//     }

//     const { data: { user } } = await supabase.auth.getUser();

//     if (!user) return null;

//     const { data: profile } = await supabase
//       .from('users')
//       .select('*')
//       .eq('id', user.id)
//       .single();

//     return {
//       id: user.id,
//       email: user.email!,
//       name: profile?.name || user.user_metadata?.name || 'User',
//       createdAt: new Date(profile?.created_at || user.created_at),
//     };
//   } catch (error) {
//     console.error('Get current user error:', error);
//     return null;
//   }
// }

// export function onAuthChange(callback: (user: User | null) => void) {
//   if (!supabase) {
//     console.error('Supabase client not initialized');
//     return { data: { subscription: { unsubscribe: () => {} } } };
//   }

//   return supabase.auth.onAuthStateChange(async (event, session) => {
//     if (session?.user) {
//       const user = await getCurrentUser();
//       callback(user);
//     } else {
//       callback(null);
//     }
//   });
// }




'use client';

import { supabase } from './supabase';
import { User } from '@/types';

export async function signUpWithEmail(
  email: string,
  password: string,
  name: string
): Promise<User> {
  try {
    if (!supabase) throw new Error('Supabase client not initialized.');

    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { name } },
    });

    if (authError) throw authError;
    if (!authData.user) throw new Error('Failed to create user');

    const user: User = {
      id: authData.user.id,
      email: authData.user.email!,
      name,
      createdAt: new Date(),
    };

    const { error: dbError } = await supabase
      .from('users')
      .insert({
        id: user.id,
        email: user.email,
        name: user.name,
        created_at: user.createdAt.toISOString(),
      });

    if (dbError) console.error('Error creating user profile:', dbError);

    return user;
  } catch (error: any) {
    console.error('Signup error:', error);
    throw new Error(error.message || 'Failed to sign up');
  }
}

export async function signInWithEmail(
  email: string,
  password: string
): Promise<User> {
  try {
    if (!supabase) throw new Error('Supabase client not initialized.');

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
    if (!data.user) throw new Error('Failed to sign in');

    const { data: profile } = await supabase
      .from('users')
      .select('*')
      .eq('id', data.user.id)
      .single();

    const user: User = {
      id: data.user.id,
      email: data.user.email!,
      name: profile?.name || data.user.user_metadata?.name || 'User',
      createdAt: new Date(profile?.created_at || data.user.created_at),
    };

    if (typeof window !== 'undefined') {
      localStorage.setItem('currentUser', JSON.stringify(user));
    }

    return user;
  } catch (error: any) {
    console.error('Sign in error:', error);
    throw new Error(error.message || 'Failed to sign in');
  }
}

export async function logOut(): Promise<void> {
  try {
    if (!supabase) throw new Error('Supabase client not initialized');
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    if (typeof window !== 'undefined') {
      localStorage.removeItem('currentUser');
    }
  } catch (error: any) {
    console.error('Sign out error:', error);
    throw new Error(error.message || 'Failed to log out');
  }
}

export async function getCurrentUser(): Promise<User | null> {
  try {
    if (!supabase) return null;

    // ✅ Use getSession() NOT getUser()
    // getUser() makes a network request that gets aborted by OTP sessions
    // getSession() reads from local storage — never aborted
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.user) return null;

    const { data: profile } = await supabase
      .from('users')
      .select('*')
      .eq('id', session.user.id)
      .single();

    // No profile = temporary OTP/password-reset session — not a real user login
    if (!profile) return null;

    return {
      id: session.user.id,
      email: session.user.email!,
      name: profile.name || session.user.user_metadata?.name || 'User',
      createdAt: new Date(profile.created_at || session.user.created_at),
    };
  } catch (error: any) {
    // Silently ignore abort errors — they happen during OTP flows
    if (error?.name === 'AbortError' || error?.message?.includes('aborted')) return null;
    console.error('Get current user error:', error);
    return null;
  }
}

export function onAuthChange(callback: (user: User | null) => void) {
  if (!supabase) {
    console.error('Supabase client not initialized');
    return { data: { subscription: { unsubscribe: () => {} } } };
  }

  return supabase.auth.onAuthStateChange(async (event, session) => {
    // ✅ Only handle real login/logout events
    // Ignore PASSWORD_RECOVERY, USER_UPDATED — these are OTP/reset flows
    if (event === 'SIGNED_IN' && session?.user) {
      // Check if real user (has profile in DB) or temp OTP session (no profile)
      const { data: profile } = await supabase!
        .from('users')
        .select('id')
        .eq('id', session.user.id)
        .single();

      if (!profile) {
        // Temporary OTP session — ignore, don't update app state
        return;
      }

      const user = await getCurrentUser();
      callback(user);

    } else if (event === 'SIGNED_OUT') {
      callback(null);

    } else if (event === 'TOKEN_REFRESHED' && session?.user) {
      const user = await getCurrentUser();
      callback(user);
    }
    // All other events (PASSWORD_RECOVERY, USER_UPDATED, etc.) — ignored
  });
}