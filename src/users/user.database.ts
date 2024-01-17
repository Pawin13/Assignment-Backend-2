import { Users, IGenderCounts } from "./user.interface";
import axios from "axios";

export const loadUsers = async () => {
  try {
    const apiResponse = await axios.get(process.env.DATA_BASE_URL + "/users");
    const dataUser =
      apiResponse?.status === 200 && apiResponse?.data?.users
        ? apiResponse.data.users
        : [];

    const groupedData = await groupByDepartment(dataUser);
    const departmentData = await groupByAttribute(groupedData);

    return departmentData;
  } catch (error) {
    console.log(`Error ${error}`);
    return {};
  }
};

const groupByDepartment = async (dataUser: Users[]) => {
  let groupedData: any = {};
  for (const item of dataUser) {
    let department = item.company.department;
    if (!groupedData[department]) {
      groupedData[department] = [];
    }
    groupedData[department].push(item);
  }
  return groupedData;
};

const groupByAttribute = async (groupedData: any) => {
  for (const item in groupedData) {
    // Department "Engineering"
    const userDepartment = groupedData[item];
    const ages: number[] = [];
    const genderCounts: IGenderCounts = {
      male: 0,
      female: 0,
    };

    for (const user of userDepartment) {
      const age = user.age;
      const gender = user.gender;
      ages.push(age);
      gender === "male" ? genderCounts.male++ : genderCounts.female++;
    }

    groupedData[item] = {
      male: genderCounts.male,
      female: genderCounts.female,
      ageRange: await agesFormat(ages),
      hair: await groupByHairColor(userDepartment),
      addressUser: await groupByAddressUser(userDepartment),
    };
  }
  return groupedData;
};

const agesFormat = async (ages: number[]) => {
  let sortAge: number[] = [];
  sortAge = ages.sort((a, b) => a - b);
  const formatAges =
    sortAge.length > 1
      ? `${sortAge[0]}-${sortAge[sortAge.length - 1]}`
      : `${sortAge[0]}`;
  return formatAges;
};

const groupByHairColor = async (userDepartment: Users[]) => {
  const colorCounts: any = {};

  for (const user of userDepartment) {
    const hairColor = user.hair.color;
    if (hairColor in colorCounts) {
      colorCounts[hairColor]++;
    } else {
      colorCounts[hairColor] = 1;
    }
  }
  return colorCounts;
};

const groupByAddressUser = async (userDepartment: Users[]) => {
  const addressUser: any = {};

  for (const user of userDepartment) {
    const firstName = user.firstName;
    const lastName = user.lastName;
    const postalCode = user.address.postalCode;
    if (!addressUser[`${firstName}${lastName}`]) {
      addressUser[`${firstName}${lastName}`] = `${postalCode}`;
    }
  }
  return addressUser;
};
