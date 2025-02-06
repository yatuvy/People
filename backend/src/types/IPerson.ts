export type IPerson = {
    email: string;
    gender: string;
    phone: string;
    name: {
        title: string;
        first: string;
        last: string;
    };
    picture: {
        thumbnail: string;
        large: string;
    }
    login: {
        uuid: string;
    }
    location: {
        country: string;
        city: string;
        state: string;
        street: {
            number: number;
            name: string;
        }
    }
    dob: {
        date: string;
        age: number;
    }
};
