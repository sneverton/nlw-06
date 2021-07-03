import { getCustomRepository } from "typeorm";
import { TagsRepositories } from "../repositories/TagsRepositories";

interface ITagRequest {
  name: string;
}

class CreateTagService {
  async execute({ name }): Promise<ITagRequest> {
    if (!name) throw new Error("Name incorrect");

    const tagsRepository = getCustomRepository(TagsRepositories);

    const tagAlreadyExists = await tagsRepository.findOne({ name });

    if (tagAlreadyExists) throw new Error("Tag already exists");

    const tag = tagsRepository.create({
      name,
    });

    await tagsRepository.save(tag);

    return tag;
  }
}

export { CreateTagService };
