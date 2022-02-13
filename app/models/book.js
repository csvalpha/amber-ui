import Model, { attr } from '@ember-data/model';

export default class Article extends Model {
  // Attributes
  @attr('string') title;
  @attr('string') author;
  @attr('string') description;
  @attr('string') isbn;
  @attr coverPhoto;
  @attr coverPhotoUrl;

  // Getters
  get excerpt() {
    const maxExcerptLength = 218;
    if (this.description && this.description.length > maxExcerptLength) {
      return `${this.description.substr(0, this.description.lastIndexOf(' ', maxExcerptLength))}...`;
    }

    return this.description;
  }

  get coverPhotoUrlOrDefault() {
    return this.coverPhotoUrl || '/images/fallback/book_cover_default.png';
  }
}
