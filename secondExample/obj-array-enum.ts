enum Role {ADMIN, AUTHOR}

const person: { // 이해를 위해서 이렇게
    name: string
    age: number
    hobbies: string[]
    tup: [number, string]
    role: Role
} = { // 걍 이것만 쓰는게 제일 간결
    name: 'maximilian',
    age: 30,
    hobbies: ['sport', 'cooking'],
    tup: [2, "author"],
    role: Role.ADMIN
};

person.tup.push("gg"); // 이건 됨. ts가 못잡는 에러

let favoriteActivities: string[];
favoriteActivities = ['ss'];

let tup: [number, string];
tup = [2, 'gst'];

if(person.role === Role.ADMIN) {
    console.log("enum is work!");
}
