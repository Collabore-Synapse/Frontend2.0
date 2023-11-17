export interface Login {
    name: string;
    password: string;
}


export interface GoogleInfos {
    name: string;
    email: string;
    google_id: string;
    
}

export interface CreateAccount {
    name: string;
    email: string;
    password: string;
}

export interface UserPosts {
    id: number;
    city: String;
    tag: String;
    title: String;
    text: String;
    name: String;
    link_pfp: String;
    image: String;
}