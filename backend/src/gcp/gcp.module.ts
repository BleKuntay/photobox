import { Module } from '@nestjs/common';
import { GCPProviders } from './gcp.providers';

@Module({
  providers: [GCPProviders],
  exports: [GCPProviders],
})
export class GcpModule {}
