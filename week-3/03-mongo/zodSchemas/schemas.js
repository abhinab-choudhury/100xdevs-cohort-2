const z = require("zod");

const userSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});
const courseSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(10),
  price: z.number().gte(0),
  image_link: z.string().min(1),
});

module.exports = {
  userSchema,
  courseSchema,
};
