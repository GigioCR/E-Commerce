const supabase = require('../../../config/db');
require('dotenv').config();

class AuthRepository {
    constructor() {
        this.client = supabase;
        this.tableName = 'Profile';
    }

    async userExists(email) {
        try {
            const { data: { users }, error: authError } = await this.client.auth.admin.listUsers();
            
            if (authError) throw authError;
            
            const userExists = users.some(user => user.email === email);
            
            if (userExists) {
                return true;
            }
            
            const { data: profileData, error: profileError } = await this.client
                .from(this.tableName)
                .select('email')
                .eq('email', email)
                .single();
                
            if (profileError) {
                if (profileError.code === 'PGRST116') { 
                    return false;
                }
                throw profileError;
            }
            
            return !!profileData;
            
        } catch (error) {
            console.error('Error checking user existence:', error);
            throw error;
        }
    }

    async signUp(email, password) {
        const { data,error } = await this.client.auth.signUp({
            email,
            password
        })
        if (error) throw error
        return data
    }

    async createUser(user) {
        console.log(user);
        const { data, error } = await this.client
            .from(this.tableName)
            .insert([user])
            .select()
            .single();
        if (error) throw error
        return data
    }

    async login(email, password) {
        const { data, error } = await this.client.auth.signInWithPassword({
            email,
            password
        });
        if (error) throw error;
        

        const { data: profile, error: profileError } = await this.client
            .from(this.tableName)
            .select('*')
            .eq('id', data.user.id)
            .single();
            
        if (profileError) throw profileError;
        
        return {
            user: data.user,
            profile: profile,
            session: data.session
        };
    }


    async logout() {
        const { error } = await this.client.auth.signOut();
        if (error) throw error;
        return true;
    }

    async getSession() {
        const { data: { session }, error } = await this.client.auth.getSession();
        if (error) throw error;
        
        if (!session) {
            return null;
        }

        const { data: profile, error: profileError } = await this.client
            .from(this.tableName)
            .select('*')
            .eq('id', session.user.id)
            .single();
            
        if (profileError) throw profileError;

        return {
            user: session.user,
            profile,
            session
        };
    }


}

module.exports = AuthRepository;