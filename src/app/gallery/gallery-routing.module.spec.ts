import { GalleryRoutingModule } from './gallery-routing.module';

describe('GalleryRoutingModule', () => {
  let galleryRoutingModule: GalleryRoutingModule;

  beforeEach(() => {
    galleryRoutingModule = new GalleryRoutingModule();
  });

  it('should create an instance', () => {
    expect(galleryRoutingModule).toBeTruthy();
  });
});
