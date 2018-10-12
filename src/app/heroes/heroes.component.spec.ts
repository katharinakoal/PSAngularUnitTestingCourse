import { HeroesComponent } from './heroes.component';
import { of } from 'rxjs';

describe('HeroesComponent', () => {
  let component: HeroesComponent;
  let mockHeroes;
  let mockHeroService;

  beforeAll(() => {
    mockHeroes = [
      { id: 1, name: 'spiderman', strength: 8 },
      { id: 2, name: 'batman', strength: 24 },
      { id: 3, name: 'superman', strength: 99 }
    ];
    mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero']);
    component = new HeroesComponent(mockHeroService);
  });

  describe('delete', () => {
    it('should delete the indicated hero from heroes list', () => {
      mockHeroService.deleteHero.and.returnValue(of(true)); // let mockHeroService return an observable
      component.heroes = mockHeroes;
      const heroToDelete = mockHeroes[1];

      component.delete(heroToDelete);

      expect(component.heroes.filter(hero => hero.id === heroToDelete.id)).toEqual([]);
    });
    it('should call deleteHero() with indicated hero', () => {
      mockHeroService.deleteHero.and.returnValue(of(true)); // let mockHeroService return an observable
      component.heroes = mockHeroes;
      const heroToDelete = mockHeroes[2];

      component.delete(heroToDelete);

      expect(mockHeroService.deleteHero).toHaveBeenCalledWith(heroToDelete);
    });
  });
});
