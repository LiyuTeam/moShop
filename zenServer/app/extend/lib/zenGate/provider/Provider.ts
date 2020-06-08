import Seneca from 'seneca';
export declare type ProviderSeat = {
  role: string;cmd: string;
}

export declare type ProviderAction = (scope: any, props: any, reply) => {}

export class Provider {
  protected seneca: any;

  protected registerProvider() {
    this.seneca = Seneca();
  }

  protected employ(seat: ProviderSeat, action: ProviderAction) {
    this.seneca.add(seat, action.bind(this));
  }

}

/**
   * 应用混合
   * @param derivedCtor
   * @param mixins
   */
export const applyMixins = (derivedCtor: any, mixins: any[]) => {
  mixins.forEach(mixin => {
    Object.getOwnPropertyNames(mixin.prototype).forEach(name => {
      derivedCtor.prototype[name] = mixin.prototype[name];
    });
  });
};
